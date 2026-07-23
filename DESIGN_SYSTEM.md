# Design System — Next Gen Computer

The canonical, living reference for tokens, components, and motion patterns.
Update this file whenever a design decision changes — don't let it drift
from the code the way a one-off snapshot doc would. (`design1.md` is an
earlier dated snapshot; this file supersedes it going forward.)

See `PROJECT_CONTEXT.md` for the business/product reasoning behind these
choices. See `TASKS.md` for what's still open.

---

## 1. Theme tokens (`src/app/globals.css`)

Two themes, one variable set, `.dark`/`.light` classes swapped by
`next-themes` (`attribute="class"`, `defaultTheme="dark"`,
`enableSystem={false}` — OS preference is never auto-detected).

### Dark (default)

| Token | Value | Role |
|---|---|---|
| `--background` | `#0a0a0c` | page bg |
| `--surface` / `--surface-2` | `#141417` / `#1c1c1f` | cards, nested surfaces |
| `--foreground` | `#f3f1ec` | body text (warm off-white) |
| `--muted` | `#9c9a97` | secondary text |
| `--border` | `rgba(243,241,236,0.08)` | hairlines |
| `--accent` | `#3ed8c3` | signal teal — primary CTA/link/glow color |
| `--accent-foreground` | `#04211c` | text on accent-filled buttons |
| `--sale` | `#c9a15a` | price/sale badges, accessories category |
| `--success` | `#34d399` | success states |
| `--accent-business` | `#d6d9e0` | laptops/business category accent |

### Light

`--background:#f5f5f7` `--surface:#ffffff` `--foreground:#1d1d1f`
`--muted:#6e6e73` `--accent:#0891b2` `--sale:#d97706`. The `.atmosphere` glow
layer and `.grain` texture are **dark-only** — light theme stays flat/clean,
no glow effects (`.light .atmosphere, .light .grain { display: none; }`).

### Category accent system ("Tech Aurora")

Maps 1:1 to real catalog categories, nothing invented:
- **Gaming PCs** → `--accent` (teal)
- **Laptops** → `--accent-business` (cool silver)
- **Accessories** → `--sale` (brass/gold)

### Secondary glow colors (used sparingly, alongside the teal accent)

- Violet `#a78bfa` — the RGB owner-photo ring, the Services page's
  "enterprise" card glow tint, one of the `.atmosphere` blobs.
- Gold `#c9a15a` — shared with `--sale`, third stop in the owner-photo ring.

When a section needs a second glow color, reach for one of these two before
inventing a new one — that's what "keep the gradient consistent, don't
introduce a clashing new palette" means in practice.

---

## 2. Fonts (`src/app/layout.tsx`)

| Variable | Font | Utility class | Used for |
|---|---|---|---|
| `--font-geist-sans` | Geist Sans | `font-sans` (default body) | body text everywhere |
| `--font-space-grotesk` | Space Grotesk | `font-display` | **all headlines**, all page titles, section headings, card titles |
| `--font-fraunces` | Fraunces (500/600) | `font-serif` | **sparingly**: italic pull-quotes and one-off closing statements only |
| `--font-jetbrains-mono` | JetBrains Mono | `font-mono` | prices, spec values, SKU-like data |

**Rule, learned the hard way**: every headline across the site — homepage
scroll-story chapters included — uses `font-display` (Space Grotesk), same
as `/services`, `/about`, `/repair`, etc. Fraunces is the *accent* font: an
italicized single word/phrase (e.g. Services' "*Professionally*.", the
homepage founder pull-quote) or a short closing CTA line, never a whole
headline. This was a real bug once — the scroll-story chapters briefly had
full-serif headlines while every other page used `font-display`, which read
as inconsistent. Fixed by reverting those headlines to `font-display` and
keeping Fraunces to true accents only.

Times New Roman was requested once for headings; Fraunces was used instead
(already in the type system, reads as "more character" without the
generic-word-processor connotation TNR carries). Flagged, not yet
overridden.

---

## 3. Shared surface / component language

- **`.glass-card`** (`globals.css`) — `border-radius:28px`, translucent bg +
  `backdrop-filter:blur(24px)`, soft shadow. The default "floating card over
  imagery/video" treatment: product cards, review cards, proof-point chips,
  the homepage's Visit Us panel.
- **`<Button>`** (`src/components/ui/button.tsx`) — variants `primary`
  (accent gradient fill), `secondary` (glass + border), `onImage`
  (white/translucent, for text-over-photo). Spring-hover scale (1.03) on
  all. Icon is a leading child by default — for a *trailing* icon (e.g.
  "Talk to an Expert ↗"), don't use the `icon` prop, just pass the icon as
  a second child after the label.
- **`<Section>` / `<SectionHeading>`** (`src/components/ui/section.tsx`) —
  the default page-section wrapper and heading, used on every non-scroll-
  story page (About, Shop, PDP, Repair, Services, Contact). Uses
  theme-token colors (`text-foreground`/`text-muted`) — correct here
  because these pages sit on the normal page background.
- **`<SceneHeading>`** (`src/components/scroll-story/scene-heading.tsx`) —
  the homepage-only equivalent. Hardcoded white + drop-shadow instead of
  theme tokens, because scroll-story chapters always sit over the dark
  build video regardless of light/dark theme — a themed-background
  assumption would go low-contrast there. **Don't use `<SectionHeading>`
  inside the scroll-story** for this reason; that was a real legibility bug
  once, fixed by introducing `<SceneHeading>`.
- **WhatsApp actions** always use WhatsApp's own green (`#25D366`), never
  the site accent — recognizable regardless of theme.

---

## 4. The homepage scroll-story (`src/components/scroll-story/`)

The entire `/` route is one component, `<StoryReel>` — not a stack of
independent sections. One PC-build video (147 extracted JPEG frames in
`public/featured-builds-reel/`) plays scroll-scrubbed behind **five
chapters**:

```
Hero → Behind the Counter → Featured Builds → Reviews → Visit Us
(frame 1)                                          (frame 147, case built)
```

### Mechanics

- **`story-reel.tsx`** — outer wrapper. One `useScroll` progress spans all
  five chapters. A `sticky top-0 h-screen` layer holds the video; chapter
  content sits in a sibling pulled up `-mt-[100vh]` to overlap it instead of
  stacking after it. `isolate`d so the video's z-index can't get buried
  under the page's fixed `.atmosphere` layer (root cause of an earlier
  "video is invisible" bug — `.atmosphere` sits at `z-index:-2` at the body
  level; a plain `sticky` div with no z-index of its own doesn't create a
  stacking context, so a naive `-z-10` on the video compared directly
  against the atmosphere and lost).
- **`build-reel-background.tsx`** — swaps `<img>` src imperatively via
  `useMotionValueEvent` as the shared progress changes. Frame 1 renders
  synchronously on mount (no `ready`-gated blank state). Radial vignette
  stays clear through the center, darkens toward the edges.
- **`pinned-scene.tsx`** — each chapter still pins itself independently
  (tall outer div + `sticky` inner div) so its own fan-deck/entrance
  animation has scroll distance to play against, decoupled from the shared
  background progress.
- **`fan-deck.tsx` / `fan-card.tsx` / `lib/fan-deck-math.ts`** — the
  reusable "cards settle into place on scroll" mechanic. Pure math
  (x/y/rotate/opacity from progress + index + count), responsive variants
  (desktop/tablet/mobile reduce or drop tilt/spread), `prefers-reduced-motion`
  keeps the opacity fade but drops translate/rotate.
  - `spacing` = **permanent** resting x-offset (for an actually-fanned final
    layout, e.g. Owner's proof points).
  - `enterOffset` = **transient** entrance-only x-kick that decays to 0 at
    rest (for a masonry/grid that should *arrive* from left/right but *sit*
    in its normal grid cell — used by Reviews). Don't reach for `spacing`
    when you mean `enterOffset`; conflating them once caused reviews to
    permanently drift 100s of px off their grid column.

### The five chapters, briefly

1. **Hero** (`scene-hero.tsx`) — headline/copy/CTA/rating floating directly
   over the video's opening frames, no photo of its own. Text hardcoded
   white (see §3).
2. **Behind the Counter** (`scene-owner.tsx`) — founder quote, 2×2 proof-point
   grid, founder photo as a card with a teal→violet→gold gradient ring
   ("RGB" look, no clashing new palette).
3. **Featured Builds** (`scene-featured-builds.tsx`) — real `<ProductCard>`s
   in a 3-up grid, fan-deck flattened to a near-resting tilt — commerce
   content has to end up scannable, never mid-rotation at rest.
4. **Reviews** (`scene-reviews.tsx`) — real testimonials in a genuine
   2-column CSS **grid** (not CSS-column masonry — masonry's auto-balance
   fought the pinned container's fixed height and piled everything into one
   column). Row-major grid flow gives left/right mirroring for free:
   even index left, odd index right, matched to `enterOffset` sign.
5. **Visit Us** (`scene-visit-us.tsx`) — address/hours/map in a `glass-card`
   over the video's final frames, so it's part of the story rather than a
   disconnected flat block after it. One calm blur+fade reveal, no
   fan-deck — deliberately the quietest chapter.

### Loading screen

`page-loader.tsx` shows the same open-PC-case Unsplash photo the hero used
to open on, dimmed behind the spinner — first paint shows brand imagery,
not a flat black screen.

---

## 5. Catalog pages

`/shop`, `/gaming-pcs`, `/laptops`, `/accessories` share `<CatalogView>`.
Every filter (brand, category, price band) **and** the sort control are
URL-driven (`?brand=Dell&price=1|2&sort=price-asc`) — shareable/bookmarkable,
not client-only state. Sort: Featured / Newest (real `NEW` badge data, not
a fabricated release date) / Price ↑ / Price ↓. No "Rating" sort — no
per-product rating exists in the data, only a site-wide 4.9★ average;
don't add one without real per-product review data.

---

## 6. Services page pattern (reusable for future "3-offer" pages)

Numbered-row layout (`ServiceExplorer` + `services-detail.ts`): decorative
number+rail+dot on the left, category/title/use-case tags/description in
the middle, a real Unsplash photo (grayscale + contrast, teal/violet radial
glow overlay from the bottom) on the right. "Learn more" expands inline to
the detailed bullet points + WhatsApp CTA. Photo tint alternates
teal/teal/violet per row (`GLOW_TINTS` in `service-explorer.tsx`) — reach
for that array before adding a new tint.

Photos are real, sourced via the standard workflow: `WebSearch` restricted
to `unsplash.com` → resolve the photo ID against
`unsplash.com/photos/<id>/download` (bare ID in the path works more
reliably than the full descriptive slug — some full-slug URLs 404 even when
the bare ID redirects fine) → confirm the resolved `images.unsplash.com`
URL returns `200` → download a small preview and look at it with `Read`
before committing to it.

---

## 7. Known open design decisions

See `TASKS.md` for the actionable version of this list.
