# Tasks — Next Gen Computer

Living tracker. Add to **Open** as things come up; move finished items to
**Recently shipped** with a one-line note (not a full changelog — `git log`
is authoritative for history, this is for "what's still loose"). Delete a
line once it's genuinely resolved and confirmed — don't let this file grow
stale entries that no longer apply.

---

## Open — needs a decision or a fix

### Needs the client's decision (can't resolve unilaterally)
- [ ] **Real WhatsApp/phone numbers.** `WHATSAPP_NUMBER`/`PHONE_NUMBER` in
      `src/data/business.ts` are still placeholders
      (`"911234567890"`/`"+911234567890"`). Every WhatsApp CTA site-wide is
      wired to these — swap once real numbers are provided.
- [ ] **Real Google Maps link.** `business.address.mapsUrl` is a generic
      search-query URL, not a verified place link/embed for the actual
      storefront. Get the real "Share" link from Google Maps for the exact
      Dak Bunglow Road location.
- [ ] **"Bihar's No. 1 gaming brand"** — the homepage hero headline. Strong,
      unqualified statewide superlative claim. Confirm the client is
      comfortable with it standing as-is, vs. something softer
      ("Patna's...") or sourced.
- [ ] **Fraunces vs. literal Times New Roman.** TNR was requested once for
      headings; Fraunces was used instead (already in the type system, less
      of a generic-word-processor clash). Confirm this reads right, or
      swap to literal TNR if still wanted after seeing it.

### Straightforward fixes, just not yet done
- [ ] `sitemap.ts` doesn't list `/shop` — one line to add
      (`src/app/sitemap.ts`, `staticRoutes` array).

### Lower priority / no clear next step yet
- [ ] Navbar has no scroll-linked active-indicator variant for `/` — skipped
      because no nav item currently names a homepage section to drive it.
      Only worth building if a future nav item maps to a homepage anchor.

---

## Recently shipped (most recent first)

- Services page rebuilt to the client-supplied reference: numbered rows,
  real Unsplash photos (teal/violet glow overlay, not stock icons), 4
  use-case tags per row, "Ready to build?" closing CTA.
- Fixed a site-wide font inconsistency: scroll-story chapter headlines had
  drifted to full-Fraunces-serif; reverted to `font-display` (Space
  Grotesk) to match every other page, kept Fraunces to true accents only.
- `design1.md` written (dated snapshot) → superseded by
  `PROJECT_CONTEXT.md` / `DESIGN_SYSTEM.md` / this file as the maintained
  set.
- Homepage unified into one scroll-scrubbed video story (`<StoryReel>`):
  Hero, Behind the Counter, Featured Builds, Reviews, and Visit Us now
  share one continuous PC-build background instead of separate sections/a
  static hero photo.
- Fixed Reviews' left/right entrance: switched from CSS-column masonry
  (which fought the pinned container's fixed height) to a real 2-column
  grid with alternating `enterOffset`.
- Fixed a real "video invisible" bug: the background video's `-z-10` was
  losing to the page's global `.atmosphere` layer (`z-index:-2`) because
  the video's sticky wrapper never established its own stacking context.
  Fixed with an `isolate` wrapper.
- Founder photo restored as a right-side card with a teal→violet→gold
  glow ring (was briefly shrunk to a small avatar; brought back as a card
  per feedback).
- Catalog pages (`/shop`, `/gaming-pcs`, `/laptops`, `/accessories`): added
  a sort control and made every filter URL-driven.
- Navbar: added a `layoutId`-based sliding active-route underline.
- `font-mono` applied to prices/spec values across `ProductCard`, the PDP,
  `SpecSelector`, and the basket panel.
- Design Spec v2 rollout: new dark-theme tokens (`accent-signal` teal,
  warm ink foreground), JetBrains Mono + Fraunces added, the fan-deck
  scroll mechanic (`lib/fan-deck-math.ts`) built and shared across three
  scenes.
- Enquiry basket added (confirmed with the client: lightweight
  localStorage list, not a payment cart).
- "Tech Aurora" visual pass: atmosphere background layer, glass-card
  system, category accent colors.

---

## How to use this file

When you (or a future session) finish something that was tracked here,
move it to *Recently shipped* with one line, not a paragraph — the commit
message and `git log` have the detail. When something new comes up mid-task
that isn't part of the current request, add it under *Open* rather than
scope-creeping the current change.
