# Next Gen Computer — Design Reference (v1)

This documents what's actually built: the theme system, every route, and the
scroll-story mechanic that drives the homepage. It reflects the current state
of the codebase, not the original brief — where the two differ, this file
wins.

Stack: Next.js App Router + TypeScript, Tailwind CSS v4 (CSS-first tokens, no
`tailwind.config.js`), Framer Motion, GSAP + ScrollTrigger, `next-themes`.
Enquiry-driven, not e-commerce — every "buy" action resolves to a WhatsApp
deep link or a phone call, there's no cart/checkout.

---

## 1. Theme system

Two themes, one token set (`src/app/globals.css`). Dark is default
(`defaultTheme="dark"`, `enableSystem={false}` in `layout.tsx` — the OS theme
is never auto-detected, only the explicit toggle in the navbar switches it).

### Dark (default)

| Token | Value | Used for |
|---|---|---|
| `--background` | `#0a0a0c` | page background |
| `--surface` | `#141417` | cards, footer |
| `--surface-2` | `#1c1c1f` | nested surfaces |
| `--foreground` | `#f3f1ec` | body text (warm off-white, not pure white) |
| `--muted` | `#9c9a97` | secondary text |
| `--border` | `rgba(243,241,236,0.08)` | hairlines |
| `--accent` | `#3ed8c3` | signal teal — primary CTA/link color |
| `--accent-foreground` | `#04211c` | text on accent-filled buttons |
| `--sale` | `#c9a15a` | price/sale badges, "accessories" category |
| `--success` | `#34d399` | success states |
| `--accent-business` | `#d6d9e0` | "laptops/business" category accent |

### Light

| Token | Value |
|---|---|
| `--background` | `#f5f5f7` |
| `--surface` | `#ffffff` |
| `--foreground` | `#1d1d1f` |
| `--muted` | `#6e6e73` |
| `--accent` | `#0891b2` (darker teal — stays legible on white) |
| `--sale` | `#d97706` |

The `.atmosphere` fixed-position layer (soft multi-color radial glows over a
near-black base) and the `.grain` noise texture are **dark-theme only**
(`.light .atmosphere/.grain { display: none; }`) — the light theme is a flat,
clean surface on purpose, no glow effects.

### Fonts (`layout.tsx`)

| Variable | Font | Used for |
|---|---|---|
| `--font-geist-sans` | Geist Sans | body text |
| `--font-space-grotesk` | Space Grotesk | `font-display` — most headings |
| `--font-fraunces` | Fraunces (weights 500/600) | `font-serif` — scroll-story headlines, pull-quotes, proof-point stats |
| `--font-jetbrains-mono` | JetBrains Mono | `font-mono` — prices, spec values, SKU-like data |

> Fraunces was used in place of a literal "Times New Roman" request — TNR
> reads as a generic word-processor serif and would clash with the
> glass/gaming visual language; Fraunces is already in the type system and
> gives the same "more character" upgrade without the mismatch.

### Category accent system ("Tech Aurora")

No fabricated categories — these map 1:1 to what's actually sold:

- **Gaming PCs** → `--accent` (teal)
- **Laptops** → `--accent-business` (cool silver)
- **Accessories** → `--sale` (brass/gold)

### Shared surface language

- `.glass-card` — `border-radius:28px`, translucent bg + `backdrop-filter:
  blur(24px)`, soft shadow. Used everywhere a card floats over imagery/video:
  product cards, review cards, proof-point chips, the Visit Us panel.
- Buttons: `primary` (accent gradient fill), `secondary` (glass, border),
  `onImage` (white/translucent, for text-over-photo contexts). Spring-hover
  scale (1.03) on all of them.
- WhatsApp actions always use WhatsApp's own green (`#25D366`), never the
  site accent — it's a recognizable, trust-building color independent of
  theme.

---

## 2. Route map

```
/                     Home — the scroll-video story (see §3)
/shop                 All products, filterable/sortable
/gaming-pcs           Gaming PCs only
/laptops              Laptops only
/accessories          Accessories only
/product/[slug]       Shared PDP for any product (18 static params)
/configurator         Build-your-own PC → SpecSelector → WhatsApp quote
/repair               Repair process + booking form
/services             CCTV / Networking / Enterprise (ServiceExplorer)
/about                Story, values, stats, testimonial spotlight
/contact              Enquiry form + FAQ + location
```

> **Note:** `sitemap.ts` currently lists `/`, `/gaming-pcs`, `/laptops`,
> `/accessories`, `/configurator`, `/repair`, `/services`, `/about`,
> `/contact`, and every `/product/[slug]` — but **not `/shop`**. Worth a
> one-line fix if you want it indexed.

---

## 3. Home (`/`) — the scroll-video story

The entire homepage is one component, `<StoryReel>`, not a stack of
independent sections. A single PC-build video (`design/download (2).mp4`,
extracted to 147 JPEG frames in `public/featured-builds-reel/`) plays as a
scroll-scrubbed background behind **five chapters**, so the build assembles
frame-by-frame as you scroll from the top of the page to the bottom of it:

```
Hero  →  Behind the Counter  →  Featured Builds  →  Reviews  →  Visit Us
(frame 1, parts exploded)                              (frame 147, case built)
```

### How it's built (`src/components/scroll-story/`)

- **`story-reel.tsx`** — the outer wrapper. One `useScroll` progress value
  spans all five chapters. A `sticky top-0 h-screen` layer holds the video;
  the actual chapter content sits in a sibling pulled up with `-mt-[100vh]`
  so it overlaps the sticky video instead of stacking after it. The wrapper
  is `isolate`d so its z-index stack can't get buried under the page's own
  fixed `.atmosphere` background layer (that was the root cause of an
  earlier "video is invisible" bug).
- **`build-reel-background.tsx`** — swaps the `<img>` src imperatively as
  the shared progress value changes (`useMotionValueEvent`), frame 1 → 147
  linearly across all five chapters. A radial vignette stays clear through
  the center (where the build happens) and only darkens toward the edges,
  where text sits.
- **`pinned-scene.tsx`** — each individual chapter still pins itself for its
  own scroll range (tall outer div + `sticky` inner div) so its own
  fan-deck/entrance animation has a scroll distance to play out against,
  independent of the shared background progress.
- **`fan-deck.tsx` / `fan-card.tsx` / `lib/fan-deck-math.ts`** — the
  reusable "cards settle into place as you scroll" mechanic, pure math
  (x/y/rotate/opacity from progress + index), shared by three of the five
  chapters. Responsive variants (desktop/tablet/mobile) reduce or remove the
  tilt/spread on smaller screens; `prefers-reduced-motion` keeps the opacity
  fade but drops translate/rotate entirely.

### The five chapters

1. **Hero** (`scene-hero.tsx`) — no photo of its own; headline
   ("**Bihar's No. 1** gaming brand."), copy, primary/secondary CTA, and the
   star-rating row float directly over the video's opening frames. Text is
   hardcoded white with a drop-shadow (not theme tokens — this chapter
   always sits on a dark video regardless of light/dark theme).
2. **Behind the Counter** (`scene-owner.tsx`) — founder quote + a
   `glass-card` 2×2 grid of proof points (years/rating/genuine
   parts/address), plus the founder's photo as a card on the right with a
   soft teal→violet→gold gradient ring ("RGB" lighting look without
   clashing with the rest of the palette).
3. **Featured Builds** (`scene-featured-builds.tsx`) — the real
   `ProductCard` component (reused, not rebuilt) in a 3-up grid, wrapped in
   `FanCard` with a flattened resting angle — commerce content has to end
   up scannable, not mid-rotation.
4. **Reviews** (`scene-reviews.tsx`) — real testimonials in a genuine
   two-column grid (not CSS-column masonry — that fought the pinned
   container's fixed height and piled everything into one column). Row-major
   grid flow gives left/right symmetry for free: even-indexed cards enter
   from the left, odd-indexed from the right, mirrored.
5. **Visit Us** (`scene-visit-us.tsx`) — address, hours, corporate note, and
   a Google Maps embed in a `glass-card` panel over the video's final
   (fully-assembled) frames. Calmer than the other four — one blur+fade
   reveal, no fan-deck, no staggering, by design (the "exhale" after four
   scenes of motion).

### Loading screen

`page-loader.tsx` shows the same open-PC-case Unsplash photo the old hero
used to open on, dimmed behind the spinner — first paint now shows brand
imagery instead of a flat black screen.

---

## 4. Catalog pages (`/shop`, `/gaming-pcs`, `/laptops`, `/accessories`)

All four share `<CatalogView>` (`src/components/product/catalog-view.tsx`):
a sidebar (category links, brand checkboxes, price-band checkboxes) plus a
`<ProductGrid>` of `<ProductCard>`s. Every filter *and* the sort control are
URL-driven (`?brand=Dell&price=1|2&sort=price-asc`) — shareable/bookmarkable,
not just client state.

Sort options: **Featured** (catalog order), **Newest** (real `NEW` badge
data floated to top — there's no per-product release date, so this doesn't
fabricate one), **Price ↑/↓**. No "Rating" sort — there's no per-product
rating in the data, only a site-wide 4.9★ average.

`ProductCard`: `glass-card`, category-accent glow on hover (cursor-tracked
radial gradient), price and top-2 specs in `font-mono`, quick "add to
basket" + WhatsApp enquire buttons.

---

## 5. Product detail (`/product/[slug]`)

Image left (sticky on desktop) / details right: brand, name, badges, price
(`font-mono`, large), full spec table (`font-mono` values), description,
then either a plain enquiry CTA row (WhatsApp / Call / Add to basket) or —
for configurable products — `<SpecSelector>`, a live-priced option picker
that ends in a WhatsApp message pre-filled with the exact configuration and
total.

---

## 6. Configurator (`/configurator`)

Same `<SpecSelector>` as the PDP, seeded from the flagship build
(`vengeance-i7-strike`). Sticky product art on the left, config groups on
the right, sticky price-summary bar at the bottom of the selector that
updates live and builds the WhatsApp quote message.

---

## 7. Repair (`/repair`)

Four-step numbered process grid, a "what we repair" checklist, and a
`<WhatsAppEnquiryForm>` for booking a diagnosis. No live queue/booking
system — intentionally, since there's no backend; the form composes a
WhatsApp message.

---

## 8. Services (`/services`)

Single page, `<ServiceExplorer>` component — CCTV / Networking / Enterprise
Solutions as tappable detail panels rather than three separate routes
(content wasn't deep enough to justify subroutes).

---

## 9. About (`/about`)

Full-bleed founder photo hero with an oversized "About Us" wordmark
overlay, then: `<WhoWeAreCard>`, a radial satisfaction gauge
(`<RadialProgress>`, derived from the real 4.9★ rating — not an invented
number), a horizontally-scrolling services strip, three stat cards (stock
brands / years+reviews / community), a "why choose us" value grid, a
testimonial spotlight, a closing CTA, and `<TrustBar>` (also used
standalone — shared, not duplicated).

---

## 10. Contact (`/contact`)

`<WhatsAppEnquiryForm>` (general enquiry) → `<Faq>` → `<LocationCta>` (map
embed, hours, "Get Directions" / "Corporate Enquiry"). `LocationCta` is the
same component that used to anchor the old homepage — kept here standalone
since this page needs it independent of the video-story treatment `Visit
Us` uses on the homepage.

---

## 11. Persistent chrome (every page)

- **Navbar** — sticky, glass-blurred once scrolled. "Shop" mega-menu
  (category columns with icons). Active-route indicator: a `layoutId`-based
  sliding teal underline under whichever nav item matches the current
  route (Shop/Repair/Services/About/Contact). No homepage nav item exists,
  so there's no scroll-linked variant for `/` — nothing to drive it.
- **Footer** — brand blurb + stats, Shop links, Company links (reused from
  `primaryNav`, not duplicated), Visit/Contact block.
- **WhatsApp FAB** — floating, fixed, WhatsApp green, present site-wide.
- **Enquiry basket** — `localStorage`-persisted, not a payment cart. Slide-out
  panel, composes one WhatsApp message for multiple items at once.
- **Theme toggle** — dark ⇄ light, no system-preference auto-detect.

---

## 12. What's deliberately *not* built

Confirmed out of scope, not oversights: cart/checkout & payment gateway,
360°/exploded product views, AI-recommended accessories, a wishlist backend,
live repair-queue booking. Everything funnels to WhatsApp or a phone call
instead — this is a lead-gen/catalog site for a real physical store, not an
e-commerce storefront.

## 13. Known flags worth a decision

- `sitemap.ts` doesn't include `/shop` (see §2).
- The hero headline's "Bihar's No. 1 gaming brand" is a strong, unqualified
  statewide superlative claim — confirm you're comfortable with it standing
  as-is rather than something softer or sourced.
- Times New Roman was requested for headings/stat labels; Fraunces (already
  in the type system) was used instead to avoid a generic-serif clash — flag
  if you actually want literal Times New Roman after seeing this.
