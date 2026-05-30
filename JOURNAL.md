# Journal

A running log of progress and decisions for the beauty salon showcase site.
Newest entries at the top. Each entry: what changed and why.

## 2026-05-30

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
