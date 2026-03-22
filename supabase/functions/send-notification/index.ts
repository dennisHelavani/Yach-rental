// supabase/functions/send-notification/index.ts
// Sends TWO emails when a booking is paid:
//   1. Client confirmation email (to customer)
//   2. Partner notification email (to admin — no financial data)
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
        const fromAddress = "SALTIE Cruises <bookings@saltiecruises.com>";

        // ── Booking ref ─────────────────────────────────────────
        const bookingRef = booking.id?.slice(0, 8)?.toUpperCase() || "N/A";

        // ── 1. CLIENT CONFIRMATION EMAIL ────────────────────────
        const clientSubject = `Booking Confirmed — ${booking.yacht_name} on ${booking.date}`;
        const clientHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#0f172a;">🎉 Your Booking is Confirmed!</h2>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Hi ${booking.customer_name || "there"},
        </p>
        <p style="font-size:15px;color:#334155;line-height:1.6;">
          Thank you for booking with SALTIE Cruises. Your reservation is now secured.
        </p>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;margin:16px 0;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Reference</td><td style="padding:8px 12px;">${bookingRef}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Yacht</td><td style="padding:8px 12px;">${booking.yacht_name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Date</td><td style="padding:8px 12px;">${booking.date}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Guests</td><td style="padding:8px 12px;">${booking.guests}</td></tr>
        </table>
        <p style="font-size:14px;color:#334155;line-height:1.6;background:#f0fdf4;border:1px solid #bbf7d0;padding:12px 16px;border-radius:8px;">
          <strong>What's next?</strong><br/>
          You will be contacted later by our cruise partner who will share the needed data with you 1 week prior to the sailing.
        </p>
        <p style="font-size:13px;color:#94a3b8;margin-top:24px;">
          If you have any questions, reply to this email or contact us at support@saltiecruises.com.
        </p>
        <p style="font-size:13px;color:#94a3b8;">— The SALTIE Cruises Team</p>
      </div>
    `;

        // ── 2. PARTNER NOTIFICATION EMAIL ───────────────────────
        // NO financial data: no status, amount paid, remaining, next due date
        const partnerSubject = `New Booking: ${bookingRef} — ${booking.yacht_name}`;
        const alcoholInfo = booking.alcohol_selected
            ? `Yes — ${booking.alcohol_quantity || 0} package${(booking.alcohol_quantity || 0) !== 1 ? "s" : ""}`
            : "No";

        const partnerHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#0f172a;">🛥️ New Booking Received</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;width:100%;">
          <tr style="background:#f8fafc;"><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Booking Ref</td><td style="padding:8px 12px;">${bookingRef}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Customer Name</td><td style="padding:8px 12px;">${booking.customer_name}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Customer Email</td><td style="padding:8px 12px;"><a href="mailto:${booking.customer_email}">${booking.customer_email}</a></td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Customer Phone</td><td style="padding:8px 12px;">${booking.customer_phone || "Not provided"}</td></tr>
          <tr style="background:#f8fafc;"><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Yacht Type</td><td style="padding:8px 12px;">${booking.yacht_type || booking.yacht_name || "N/A"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Alcohol Package</td><td style="padding:8px 12px;">${alcoholInfo}</td></tr>
        </table>
      </div>
    `;

        // ── Send emails via Resend ──────────────────────────────
        let clientSent = false;
        let partnerSent = false;

        if (resendKey) {
            // Send client confirmation
            if (booking.customer_email) {
                try {
                    const res = await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${resendKey}`,
                        },
                        body: JSON.stringify({
                            from: fromAddress,
                            to: [booking.customer_email],
                            subject: clientSubject,
                            html: clientHtml,
                        }),
                    });
                    clientSent = res.ok;
                    if (!res.ok) console.error("Client email failed:", await res.text());
                    else console.log(`Client confirmation sent to ${booking.customer_email}`);
                } catch (e) {
                    console.error("Client email error:", e);
                }
            }

            // Send partner notification
            if (adminEmail) {
                try {
                    const res = await fetch("https://api.resend.com/emails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${resendKey}`,
                        },
                        body: JSON.stringify({
                            from: fromAddress,
                            to: [adminEmail],
                            subject: partnerSubject,
                            html: partnerHtml,
                        }),
                    });
                    partnerSent = res.ok;
                    if (!res.ok) console.error("Partner email failed:", await res.text());
                    else console.log(`Partner notification sent to ${adminEmail}`);
                } catch (e) {
                    console.error("Partner email error:", e);
                }
            }
        }

        // ── Fallback: log to audit_events ───────────────────────
        if (!clientSent || !partnerSent) {
            console.log("One or more emails not sent. Logging to audit_events.");
            console.log("BOOKING NOTIFICATION:", JSON.stringify(booking, null, 2));

            await supabase.from("audit_events").insert({
                type: "notification.email_fallback",
                payload: {
                    client_sent: clientSent,
                    partner_sent: partnerSent,
                    intended_admin: adminEmail || "(not configured)",
                    booking_id: booking.id,
                    booking_ref: bookingRef,
                    yacht_name: booking.yacht_name,
                    yacht_type: booking.yacht_type,
                    date: booking.date,
                    customer_name: booking.customer_name,
                    customer_email: booking.customer_email,
                },
            });
        }

        return new Response(
            JSON.stringify({ client_sent: clientSent, partner_sent: partnerSent }),
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
