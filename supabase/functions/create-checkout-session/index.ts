// supabase/functions/create-checkout-session/index.ts
// Creates a Stripe Checkout Session for yacht booking

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.11.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// ── Yacht config (placeholder prices — TODO: move to DB) ──────
const YACHTS: Record<string, { name: string; max_guests: number; base_price_eur: number }> = {
  "azimut-58": { name: "Azimut 58", max_guests: 6,  base_price_eur: 15_000 },
  "azimut-66": { name: "Azimut 66", max_guests: 8,  base_price_eur: 20_000 },
  "azimut-70": { name: "Azimut 70", max_guests: 10, base_price_eur: 28_000 },
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    // ── Parse body ──────────────────────────────────────────
    const body = await req.json();
    const {
      yacht_slug,
      date,
      guests,
      alcohol_selected,
      payment_choice,
      customer_name,
      customer_email,
      customer_phone,
      notes,
    } = body;

    // ── Validate ────────────────────────────────────────────
    const errors: string[] = [];

    const yacht = YACHTS[yacht_slug];
    if (!yacht) errors.push(`Unknown yacht: ${yacht_slug}`);

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(bookingDate.getTime()) || bookingDate <= today) {
      errors.push("Date must be in the future");
    }

    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      errors.push("Guests must be at least 1");
    } else if (yacht && guestCount > yacht.max_guests) {
      errors.push(`Maximum ${yacht.max_guests} guests for ${yacht.name}`);
    }

    if (payment_choice !== "deposit" && payment_choice !== "full") {
      errors.push("Payment choice must be 'deposit' or 'full'");
    }

    if (!customer_name?.trim()) errors.push("Name is required");
    if (!customer_email?.trim()) errors.push("Email is required");
    if (!customer_phone?.trim()) errors.push("Phone is required");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ errors }), {
        status: 400,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // ── Fetch pricing config from DB ────────────────────────
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: config } = await supabase
      .from("pricing_config")
      .select("*")
      .limit(1)
      .single();

    const depositPercent = config?.deposit_percent ?? 30;
    const discountPercent = config?.full_discount_percent ?? 10;
    const discountDeadline = config?.full_discount_deadline ?? "2026-04-05";
    const alcoholPricePerPerson = config?.alcohol_price_per_person ?? 199;

    // ── Calculate pricing ───────────────────────────────────
    const basePrice = yacht.base_price_eur;
    const alcoholTotal = alcohol_selected ? guestCount * alcoholPricePerPerson : 0;

    let subtotal = basePrice + alcoholTotal;
    let discountEur = 0;
    let amountToCharge = 0;

    if (payment_choice === "full") {
      // Check if discount applies (on or before deadline)
      const deadlineDate = new Date(discountDeadline + "T23:59:59Z");
      if (new Date() <= deadlineDate) {
        discountEur = Math.round(basePrice * discountPercent / 100);
      }
      amountToCharge = subtotal - discountEur;
    } else {
      // Deposit: 30% of base price + full alcohol cost
      amountToCharge = Math.round(basePrice * depositPercent / 100) + alcoholTotal;
    }

    const totalEur = subtotal - discountEur; // Full booking value

    // ── Create Stripe Checkout Session ──────────────────────
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
    });

    // Build line items description
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (payment_choice === "deposit") {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${yacht.name} — 30% Deposit`,
            description: `Charter date: ${date} · ${guestCount} guests`,
          },
          unit_amount: Math.round(basePrice * depositPercent / 100) * 100, // cents
        },
        quantity: 1,
      });
    } else {
      const charterAmount = basePrice - discountEur;
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `${yacht.name} — Full Charter`,
            description: `Charter date: ${date} · ${guestCount} guests${discountEur > 0 ? ` · 10% early-bird discount applied` : ""}`,
          },
          unit_amount: charterAmount * 100,
        },
        quantity: 1,
      });
    }

    if (alcohol_selected && alcoholTotal > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Alcohol Package",
            description: `€${alcoholPricePerPerson}/person × ${guestCount} guests`,
          },
          unit_amount: alcoholPricePerPerson * 100,
        },
        quantity: guestCount,
      });
    }

    // Determine success/cancel URLs
    const origin = req.headers.get("origin") || "https://yachtdaysgreece.com";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customer_email,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel.html`,
      metadata: {
        yacht_slug,
        yacht_name: yacht.name,
        date,
        guests: String(guestCount),
        alcohol_selected: String(alcohol_selected),
        payment_choice,
        customer_name,
        customer_phone,
      },
    });

    // ── Insert booking row ──────────────────────────────────
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert({
        status: "pending",
        yacht_slug,
        yacht_name: yacht.name,
        date,
        guests: guestCount,
        alcohol_selected: !!alcohol_selected,
        alcohol_price_total: alcoholTotal,
        payment_choice,
        subtotal_eur: subtotal,
        discount_eur: discountEur,
        total_eur: totalEur,
        amount_charged_eur: amountToCharge,
        customer_name,
        customer_email,
        customer_phone,
        notes: notes || null,
        stripe_session_id: session.id,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Booking insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to create booking" }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      });
    }

    // ── Return checkout URL ─────────────────────────────────
    return new Response(
      JSON.stringify({
        url: session.url,
        booking_id: booking.id,
        session_id: session.id,
      }),
      {
        status: 200,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Checkout error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
});
