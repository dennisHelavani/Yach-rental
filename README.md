# SALTIE Greece — Booking System

Premium yacht charter booking with Supabase + Stripe Checkout.

## Quick Start

### 1. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor to create tables
3. Copy your project URL and keys

### 2. Environment Variables
Copy `.env.example` and fill in your values. Frontend needs `SUPABASE_URL` and `SUPABASE_ANON_KEY` set in `js/booking.js`.

### 3. Deploy Edge Functions
```bash
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
supabase functions deploy send-notification
```

Set secrets:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set ADMIN_NOTIFICATION_EMAIL=admin@yachtdaysgreece.com
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Stripe Setup
1. Get test API keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Create a webhook endpoint pointing to: `https://<project>.supabase.co/functions/v1/stripe-webhook`
3. Subscribe to events: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`

### 5. Local Development
```bash
npx serve .
# Open http://localhost:3000
```

## Architecture

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML/CSS/JS |
| Backend | Supabase Postgres + Edge Functions (Deno) |
| Payments | Stripe Checkout |
| Email | Resend (fallback: audit log) |

## Pricing Logic

- **Deposit**: 30% of base charter price + alcohol package (if selected)
- **Full Payment**: Base price − 10% discount (if before April 5, 2026) + alcohol package
- **Alcohol Package**: €199/person
