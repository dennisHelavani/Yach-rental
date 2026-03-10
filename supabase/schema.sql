-- ============================================================
-- SALTIE Greece — Supabase Schema
-- ============================================================

-- 1. Pricing configuration (single-row lookup table)
create table if not exists pricing_config (
  id                     uuid        primary key default gen_random_uuid(),
  deposit_percent        int         not null default 30,
  full_discount_percent  int         not null default 10,
  full_discount_deadline date        not null default '2026-04-05',
  alcohol_price_per_person int      not null default 199,
  currency               text        not null default 'EUR',
  created_at             timestamptz not null default now()
);

-- Seed default config row
insert into pricing_config (
  deposit_percent,
  full_discount_percent,
  full_discount_deadline,
  alcohol_price_per_person,
  currency
) values (30, 10, '2026-04-05', 199, 'EUR')
on conflict do nothing;


-- 2. Bookings
create table if not exists bookings (
  id                      uuid        primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  status                  text        not null default 'pending',
    -- pending | paid | cancelled | failed
  yacht_slug              text        not null,
  yacht_name              text        not null,
  date                    date        not null,
  guests                  int         not null,
  alcohol_selected        boolean     not null default false,
  alcohol_price_total     int         not null default 0,
  payment_choice          text        not null,
    -- deposit | full
  subtotal_eur            int         not null,
  discount_eur            int         not null default 0,
  total_eur               int         not null,
  amount_charged_eur      int         not null default 0,
  customer_name           text,
  customer_email          text,
  customer_phone          text,
  notes                   text,
  stripe_session_id       text,
  stripe_payment_intent_id text
);

create index if not exists idx_bookings_status
  on bookings (status);
create index if not exists idx_bookings_date
  on bookings (date);
create index if not exists idx_bookings_stripe_session
  on bookings (stripe_session_id);


-- 3. Audit events (generic log)
create table if not exists audit_events (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type       text        not null,
  payload    jsonb       not null
);
