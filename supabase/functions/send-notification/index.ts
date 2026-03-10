// supabase/functions/send-notification/index.ts
// Sends admin email notification when a booking is paid.
// Falls back to audit_events + console.log if no email provider.

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

serve(async (req: Request) => {
    try {
        const booking = await req.json();

        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || "";
        const resendKey = Deno.env.get("RESEND_API_KEY") || "";

        // ── Build email content ─────────────────────────────────
        const subject = `New Booking: ${booking.yacht_name} — ${booking.date}`;
        const htmlBody = `
      <h2>🛥️ New Yacht Booking Confirmed</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px;font-weight:bold;">Yacht</td><td style="padding:6px 12px;">${booking.yacht_name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Date</td><td style="padding:6px 12px;">${booking.date}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Guests</td><td style="padding:6px 12px;">${booking.guests}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Payment</td><td style="padding:6px 12px;">${booking.payment_choice === "full" ? "Full Payment" : "30% Deposit"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Alcohol Package</td><td style="padding:6px 12px;">${booking.alcohol_selected ? `Yes (€${booking.alcohol_price_total})` : "No"}</td></tr>
        ${booking.discount_eur > 0 ? `<tr><td style="padding:6px 12px;font-weight:bold;">Discount</td><td style="padding:6px 12px;">−€${booking.discount_eur}</td></tr>` : ""}
        <tr><td style="padding:6px 12px;font-weight:bold;">Amount Charged</td><td style="padding:6px 12px;">€${booking.amount_charged_eur}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Total Value</td><td style="padding:6px 12px;">€${booking.total_eur}</td></tr>
        <tr><td colspan="2" style="padding:12px 12px 6px;font-weight:bold;border-top:1px solid #ddd;">Customer</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${booking.customer_name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${booking.customer_email}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${booking.customer_phone}</td></tr>
        ${booking.notes ? `<tr><td style="padding:6px 12px;font-weight:bold;">Notes</td><td style="padding:6px 12px;">${booking.notes}</td></tr>` : ""}
      </table>
    `;

        // ── Try sending via Resend ───────────────────────────────
        if (resendKey && adminEmail) {
            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${resendKey}`,
                },
                body: JSON.stringify({
                    from: "SALTIE Greece <bookings@yachtdaysgreece.com>",
                    to: [adminEmail],
                    subject,
                    html: htmlBody,
                }),
            });

            if (res.ok) {
                console.log(`Notification email sent to ${adminEmail}`);
                return new Response(JSON.stringify({ sent: true }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            } else {
                const errText = await res.text();
                console.error("Resend API error:", errText);
                // Fall through to audit log
            }
        }

        // ── Fallback: log to audit_events ───────────────────────
        console.log("Email provider not configured or failed. Logging to audit_events.");
        console.log("BOOKING NOTIFICATION:", JSON.stringify(booking, null, 2));

        await supabase.from("audit_events").insert({
            type: "notification.email_fallback",
            payload: {
                intended_recipient: adminEmail || "(not configured)",
                subject,
                booking_id: booking.id,
                yacht_name: booking.yacht_name,
                date: booking.date,
                guests: booking.guests,
                total_eur: booking.total_eur,
                customer_name: booking.customer_name,
                customer_email: booking.customer_email,
            },
        });

        return new Response(
            JSON.stringify({ sent: false, fallback: "audit_events" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (err) {
        console.error("Notification error:", err);
        return new Response(
            JSON.stringify({ error: err.message || "Notification failed" }),
            { status: 500 }
        );
    }
});
