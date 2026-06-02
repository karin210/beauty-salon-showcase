# Journal

A running log of progress and decisions for the beauty salon showcase site.
Newest entries at the top. Each entry: what changed and why.

## 2026-06-02 (hero CTA opens booking modal)

- Lifted the booking modal's UI state into the Pinia store (`stores/bookings.ts`):
  added `isModalOpen`, `activeService`, and `openModal()` / `closeModal()` so any
  component can open the modal for a given service.
- `BookingModal.vue`: dropped the `modelValue` / `serviceName` props and the
  `update:modelValue` emit; it now reads `isModalOpen` / `activeService` from the
  store (via `storeToRefs`) and closes through `closeModal()`.
- `HeroSection.vue`: the "Agendar cita" CTA is now a `<button>` that calls
  `openModal('Cita general')` instead of an `<a href="#agendar">` placeholder.
  Updated `.hero__cta` CSS (border reset, `cursor`, `font-family`) to keep the
  button visually identical to the old anchor.
- `ServicesSection.vue`: removed the local `bookingOpen` / `bookingService` refs
  and the embedded modal; cards now call `bookingStore.openModal(service.name)`.
- `index.vue`: mounts a single `<BookingModal />` at page level, shared by the
  hero CTA and every service card.

## 2026-06-02 (services data + category images)

- `ServicesSection.vue`: added a "Baby boomer" service to the "Manos y pies"
  category (nail version, distinct from the hair colouring technique under
  "Cabello"), using `/babyboomer.webp`.
- Removed the four image-less services from "Manos y pies" (Retoque de acrílico,
  Retiro de gel, Retiro de acrílico, Pedi express).
- Wired up the per-category hero image: `tab-panel__image` is now a real `<img>`
  bound to `category.image` with descriptive `alt` text, replacing the empty
  placeholder `<div>`. CSS dropped the placeholder tint/opacity and added
  `object-fit: cover` + `width: 100%` at the existing 4/3 aspect ratio. Added the
  `image` field to `ServiceCategory` and the corresponding `*-main-image` assets
  in `public/`.

## 2026-05-31 (Pinia state management + Próximas citas)

- Installed `@pinia/nuxt` + `pinia`; registered module in `nuxt.config.ts`.
- Created `app/stores/bookings.ts`: a Pinia store that holds an array of confirmed bookings (service name, date, time, UUID).
- Updated `BookingModal.vue` to call `bookingStore.add()` when a time slot is selected, persisting the booking to the store.
- Added a "Próximas citas" section to `profile.vue` that reads from the store and lists upcoming appointments sorted by date, with an empty-state message when none exist.

## 2026-05-30 (booking modal)

- Added `app/components/BookingDatePicker.vue`: a pure-CSS calendar grid
  (Monday-first, Spanish month/day labels) that emits a `select` event with
  the chosen `Date`. Past dates are disabled. Month navigation via prev/next
  buttons.
- Added `app/components/BookingTimePicker.vue`: a 3-column grid of time-slot
  buttons (09:00–18:00, lunch gap at 13:00). Displays the selected date,
  emits `select` with the time string, and emits `back` to return to the
  calendar.
- Added `app/components/BookingModal.vue`: a native `<dialog>` element
  (showModal / close via Vue watcher) managing three steps — date → time →
  confirm. Confirm auto-closes after 2 s. Backdrop handled via a non-scoped
  `::backdrop` rule (scoped attributes don't reach the top layer). Closes on
  Escape (cancel.prevent → emit), backdrop click, or the × button.
- Updated `app/components/ServicesSection.vue`: each service card now has a
  calendar-icon button in its footer row that opens BookingModal for that
  category. Inlined the SVG from `public/calendar-icon.svg` with
  `stroke="currentColor"` for token-driven colour control. Lifted
  `bookingOpen` / `bookingService` refs and `openBooking()` to section scope.

## 2026-05-30 (profile page)

- Added `app/pages/profile.vue`: a dedicated `/profile` route showing fake user data
  (Valentina Morales — name, phone, email), last service with date, "Ver historial de
  estilos" section listing 4 past visits, and "Recordatorios" section with 3 reminder
  cards (retoque de raíces, hidratación, recorte de puntas). Reminder cards use a
  `data-urgency` attribute to drive left-border and badge colour via CSS attribute
  selectors — no inline styles or JS logic. All colours from `:root` tokens; all font
  sizes via `clamp()`; fully WCAG AA accessible (semantic headings, `aria-labelledby`
  on every section, keyboard-navigable contact links).
- Updated `app/components/SiteHeader.vue`: profile `<button>` replaced with
  `<NuxtLink to="/profile">` so clicking the icon navigates to the profile page.
  Added `text-decoration: none` to the existing `.site-header__profile` rule.
- Added `--color-border: rgba(43, 32, 36, 0.15)` utility token to `main.css` for
  the default (neutral) reminder card border colour.

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
