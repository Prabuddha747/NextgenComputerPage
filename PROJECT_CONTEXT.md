# Project Context — Next Gen Computer

Read this first in any new session. It's the "why" behind the site — the
business it's for, who it's serving, and the standing decisions that shape
every change. `DESIGN_SYSTEM.md` covers the "how" (tokens, components,
motion); `TASKS.md` tracks what's open.

## The business

**Next Gen Computer** — a real, 26+-year-old computer/gaming-hardware
retailer, repair shop, and IT services business on **Dak Bunglow Road,
Patna, Bihar**. 4.9★ average across 2,700+ Google reviews. Owner: **Sanjeev**
(`business.founderName`).

Sells: Dell, HP, Lenovo, Asus, Acer, MSI, Apple laptops; custom/prebuilt
gaming PCs; accessories (keyboards, mice, monitors, cooling, chairs).
Services: laptop/desktop repair, CCTV installation, networking, enterprise
IT (bulk procurement, AMC support) for schools/colleges/corporate offices.

All real business facts live in `src/data/business.ts` — treat that file as
the single source of truth, not this document (this document can drift;
that file is read by the running site).

## What this site is — and isn't

**Enquiry-driven, not e-commerce.** Confirmed explicitly with the client,
twice (once for the site's ordering model overall, once specifically about
a "shopping cart"). There is no payment/checkout. Every conversion path ends
at a WhatsApp deep link (`buildWhatsAppLink`) or a phone call
(`buildTelLink`) — never a cart checkout flow.

The "enquiry basket" (`BasketProvider`/`useBasket`) is a **lightweight,
localStorage-only** list for building one combined WhatsApp message across
several products — not a payment cart. Don't grow it into one.

## Explicitly out of scope (asked for, deliberately not built)

- Full cart/checkout & payment gateway
- 360° product rotation / exploded views
- AI-recommended accessories
- Wishlist with a backend
- Live repair-queue booking system

These come up in briefs sometimes (they were in the original creative
brief). If a future request implies rebuilding one of these, it's a scope
change worth flagging, not a bug to silently fix.

## Target users / buyer journey

Individual buyers (students, gamers, professionals) walking in or messaging
for a laptop/gaming PC/repair, **and** institutional buyers (schools,
colleges, corporate offices) after bulk pricing or AMC support. Content and
CTAs on `/about`, `/services`, and the enterprise-solutions material
address the second group specifically — don't lose that when iterating on
consumer-facing sections.

## Standing process rules

- **Git**: push to `https://github.com/Prabuddha747/NextgenComputerPage`,
  branch `main`. Commit **point-to-point** (small, incremental, logically
  scoped commits) — never one giant commit for a whole session's work.
  **No `Co-Authored-By`/session trailer** in commit messages — the client
  asked for this explicitly, more than once.
- **Verification loop before every commit**: `npm run lint` → `npm run
  build` → kill port 3000 → restart `npm run dev` in background → poll
  until ready → `curl` each affected route for `200` → `grep` the dev log
  for `error|hydrat` → only then commit/push.
- **ponytail** (lean-code discipline) is active every response: reuse over
  duplication, delete confirmed-dead code instead of leaving it orphaned,
  smallest correct diff, no speculative abstraction.
- **Never fabricate real-world content.** No fake customer photos, no
  invented precise stats, no duplicate reviews dressed up as unique ones,
  no features (360° view, AI recommendations) that don't exist presented as
  if they do. If something can't be done honestly with real data, say so
  and flag it — don't fake it.
- **Placeholders still pending real data** (grep for these before assuming
  they're live): `WHATSAPP_NUMBER` / `PHONE_NUMBER` in `src/data/business.ts`
  are still the placeholder `"911234567890"` / `"+911234567890"` — swap for
  the real numbers before this goes live. `business.address.mapsUrl` is a
  generic Google Maps search link, not a verified place ID.

## Tech stack (and why)

Next.js App Router + TypeScript over plain React — needs real routing, SEO
metadata per page, sitemap/robots, and image optimization natively rather
than bolted on. Tailwind CSS v4 (CSS-first `@theme inline` tokens, no
`tailwind.config.js`). Framer Motion for gesture/scroll-linked component
animation. GSAP + ScrollTrigger available for anything Framer Motion can't
do as cleanly (currently: none of the shipped scroll-story mechanic uses
GSAP — it's all Framer Motion `useScroll`/`useTransform`). `next-themes`
for the dark/light toggle. No backend, no CMS — catalog/business/
testimonial/FAQ data lives in typed `src/data/*.ts` files.
