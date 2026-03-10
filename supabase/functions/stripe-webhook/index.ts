// supabase/functions/stripe-webhook/index.ts
// Handles Stripe webhook events to update booking status

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.11.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

serve(async (req: Request) => {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
        apiVersion: "2023-10-16",
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        // ── Verify Stripe signature ─────────────────────────────
        const body = await req.text();
        const sig = req.headers.get("stripe-signature");
        const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return new Response(JSON.stringify({ error: "Invalid signature" }), {
                status: 400,
            });
        }

        // ── Log every event to audit_events ─────────────────────
        await supabase.from("audit_events").insert({
            type: `stripe.${event.type}`,
            payload: event.data.object as Record<string, unknown>,
        });

        // ── Handle events ───────────────────────────────────────
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const sessionId = session.id;
                const paymentIntentId =
                    typeof session.payment_intent === "string"
                        ? session.payment_intent
                        : session.payment_intent?.id ?? null;

                // Update booking → paid
                const { data: booking, error } = await supabase
                    .from("bookings")
                    .update({
                        status: "paid",
                        stripe_payment_intent_id: paymentIntentId,
                    })
                    .eq("stripe_session_id", sessionId)
                    .select("*")
                    .single();

                if (error) {
                    console.error("Failed to update booking:", error);
                    break;
                }

                console.log(`Booking ${booking.id} marked as paid`);

                // ── Trigger notification ──────────────────────────────
                try {
                    const fnUrl = `${supabaseUrl}/functions/v1/send-notification`;
                    await fetch(fnUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${supabaseKey}`,
                        },
                        body: JSON.stringify(booking),
                    });
                } catch (notifErr) {
                    console.error("Notification trigger failed:", notifErr);
                    // Non-fatal — booking is already saved
                }
                break;
            }

            case "checkout.session.expired": {
                const session = event.data.object as Stripe.Checkout.Session;
                await supabase
                    .from("bookings")
                    .update({ status: "cancelled" })
                    .eq("stripe_session_id", session.id);

                console.log(`Booking for session ${session.id} cancelled (expired)`);
                break;
            }

            case "payment_intent.payment_failed": {
                const intent = event.data.object as Stripe.PaymentIntent;
                // PaymentIntent doesn't have session_id directly;
                // look up by payment_intent_id if available
                await supabase
                    .from("bookings")
                    .update({ status: "failed" })
                    .eq("stripe_payment_intent_id", intent.id);

                console.log(`Payment failed for intent ${intent.id}`);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Webhook error:", err);
        return new Response(
            JSON.stringify({ error: err.message || "Webhook processing failed" }),
            { status: 500 }
        );
    }
});
