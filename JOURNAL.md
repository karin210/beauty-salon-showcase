# Journal

A running log of progress and decisions for the beauty salon showcase site.
Newest entries at the top. Each entry: what changed and why.

## 2026-05-30 (header)

- Added `app/components/SiteHeader.vue`: sticky header with a text logo
  ("Luxury Beauty" in the heading font, primary rose + ink colours) and a
  circular profile icon button (inline SVG person silhouette, `aria-label`
  for screen readers). Header uses `position: sticky; top: 0; z-index: 100`
  so it stays visible while scrolling. All sizes fluid via `clamp()`; colours
  from `:root` tokens only. Placed before `<main>` in `index.vue`.

## 2026-05-30 (footer)

- Added `app/components/SiteFooter.vue`: a dark footer (`--color-ink` background)
  with salon name, email (`<a href="mailto:…">`), phone (`<a href="tel:…">`), and
  a Morelia address inside a semantic `<address>` element. Copyright year is
  computed at runtime. Layout is a flex row that wraps on small screens. All type
  sizes use `clamp()`; all colors reference `:root` tokens. Placed after `<main>`
  in `index.vue` so it sits outside the landmark and doesn't pollute the page's
  main content region.

## 2026-05-30

- Added prev/next buttons to the services carousel. Buttons sit below the track,
  right-aligned, in a `.carousel__controls` flex row — no absolute positioning
  needed. Scroll step is computed from the live positions of the first two `<li>`
  elements (`getBoundingClientRect` diff), so it automatically accounts for any
  card width + gap without hardcoding pixel values. Applied the semicolon
  convention to all script-block statements.

- Rebuilt the services section as a tabbed interface (`app/components/ServicesSection.vue`).
  - Each of the 5 categories (Cabello, Pestañas y cejas, Depilación, Maquillaje,
    Manos y pies) is now a tab. Tab nav is horizontally scrollable on mobile.
  - Full ARIA tab pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`,
    `aria-selected`, `aria-controls`, `aria-labelledby`. Keyboard nav supports
    ArrowLeft/Right, Home, End with focus management per the ARIA APG.
  - Each panel has a headline + blurb on the left and a representative image
    placeholder on the right — the image is hidden on small screens via a
    `@media (min-width: 60rem)` gate (no absolutely-positioned elements).
  - Below the text row: a CSS scroll-snap carousel of 7 placeholder cards (3:4
    aspect image + service name). Card width uses `clamp(10rem, 28vw, 14rem)`,
    showing ~2 cards on mobile and ~5 on desktop so off-screen content is hinted.

- Added the services section (`app/components/ServicesSection.vue`), rendered
  below the hero on the home page.
  - Categories: Cabello, Pestañas y cejas, Depilación, Maquillaje, Manos y pies.
    Merged the requested "Pestañas" into "Pestañas y cejas" since brow design
    almost always sells alongside lash work — reads more complete without clutter.
  - Data-driven: a typed `Service[]` array (English ids/keys, Spanish copy)
    rendered into a responsive `auto-fit minmax(16rem, 1fr)` card grid.
  - Semantic markup: `<section>` with `aria-labelledby`, a `<ul>` of `<li>`
    wrapping each `<article>` card, and a nested `<ul>` of example treatments.
  - Reuses `:root` tokens (rose accent border, muted surface background); fluid
    type/spacing throughout, no raw hex. Anchor id `#servicios` for nav linking.

- Added the hero section as the site's first feature.
  - New `app/components/HeroSection.vue`: full-bleed `public/hair-wash-1.jpg`
    background with an "Agendar cita" CTA. The background and the dark overlay
    each live in their own absolutely-positioned wrapper so the content stays in
    normal flow (per the wrapper-only positioning rule). A `--color-overlay`
    scrim sits behind the white text to keep contrast at WCAG AA.
  - Introduced `app/assets/css/main.css` with `:root` color/typography/spacing
    tokens (no raw hex in components), a `box-sizing: border-box` reset, and base
    body styles. Registered it via `css` in `nuxt.config.ts`.
  - Activated file-based routing: added `app/pages/index.vue` (renders the hero
    inside `<main>`) and switched `app/app.vue` from `NuxtWelcome` to `NuxtPage`.
  - CTA links to `#agendar` as a placeholder anchor until a booking
    section/page exists.
- Created `JOURNAL.md` to log progress and record the reasoning behind decisions
  as the project develops. Convention: newest entries at the top, grouped by date.
