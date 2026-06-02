<script setup lang="ts">
import { ref } from "vue";
import { useBookingStore } from "~/stores/bookings";

interface Service {
  name: string;
  image: string | null;
}

interface ServiceCategory {
  id: string;
  title: string;
  headline: string;
  image: string;
  blurb: string;
  services: Service[];
}

const categories: ServiceCategory[] = [
  {
    id: "hair",
    title: "Cabello",
    headline: "Tu cabello, nuestra pasión",
    image: "/hair-main-img.jpg",
    blurb:
      "Desde cortes de autor hasta tratamientos de hidratación profunda, nuestras estilistas transforman tu cabello con técnica y dedicación. El look que siempre soñaste está a una visita de distancia.",
    services: [
      { name: "Balayage", image: "/balayage.webp" },
      { name: "Babylights", image: "/bebylights.webp" },
      { name: "Baby boomer", image: "/babyboomer.webp" },
      { name: "Ombré", image: "/ombre.webp" },
      { name: "Tono base", image: "/tono-base.webp" },
      { name: "Matiz / baño de color", image: "/matiz-baño-de-color.webp" },
      { name: "Tinte global", image: "/tinte-global.webp" },
      { name: "Retoque de canas", image: "/retoque-de-canas.webp" },
      { name: "Corte dama / Niña", image: "/corte-dama-niña.webp" },
      { name: "Corte Caballero / Niño", image: "/corte-de-cabello-niño.webp" },
      {
        name: "Curly / Alaciado Express",
        image: "/curly-alaciado-express.webp",
      },
      { name: "Falso crecimiento", image: "/falso-crecimiento.webp" },
    ],
  },
  {
    id: "lashes-brows",
    title: "Pestañas y cejas",
    headline: "Una mirada que lo dice todo",
    image: "/lashes-main-image.jpg",
    blurb:
      "Pestañas que alargan y cejas que enmarcan tu rostro. Con extensiones, lifting y diseño personalizado, tus ojos brillan con luz propia sin esfuerzo adicional.",
    services: [
      {
        name: "Retoque de extensiones de pestañas",
        image: "/retoque-de-extensiones-de-pestañas.webp",
      },
      {
        name: "Retiro de extensiones de pestañas",
        image: "/retiro-de-extensiones-de-pestañas.webp",
      },
      { name: "Lash lifting", image: "/lash-lifting.webp" },
      { name: "Brow lamination", image: "/brow-lamination.webp" },
    ],
  },
  {
    id: "micropigmentation",
    title: "Micropigmentación",
    headline: "Belleza que despierta contigo",
    image: "/micropigmentation-main-image.jpg",
    blurb:
      "Técnicas de micropigmentación para realzar cejas, labios y mirada con resultados naturales y de larga duración. Despierta cada mañana perfecta, sin retoques ni esfuerzo.",
    services: [
      { name: "Microshading", image: "/microshading.webp" },
      { name: "Microblading", image: "/microblanding.webp" },
      { name: "Punteado de pestañas", image: "/punteado-de-pestañas.webp" },
      { name: "Baby lips", image: "/baby-lips.webp" },
      { name: "Delineado de párpados", image: "/delineado-de-parpados.webp" },
    ],
  },
  {
    id: "waxing",
    title: "Depilación",
    headline: "Piel suave, sin complicaciones",
    image: "/waxing-main-image.jpg",
    blurb:
      "Depilación facial y corporal con cera de alta calidad para resultados duraderos. Saldrás sintiéndote fresca e impecable, lista para cualquier ocasión.",
    services: [
      { name: "Laminado de ceja", image: "/laminado-de-ceja.webp" },
      { name: "Diseño de ceja", image: "/diseño-de-ceja.webp" },
      { name: "Depilación", image: "/depilacion.webp" },
    ],
  },
  {
    id: "makeup-styling",
    title: "Maquillaje y peinado",
    headline: "Luce perfecta en cada ocasión",
    image: "/makeup-main-image.webp",
    blurb:
      "Maquillaje profesional y peinados a la medida de tu estilo y de tu evento. Desde looks naturales para el día a día hasta propuestas espectaculares para tus momentos más especiales.",
    services: [
      { name: "Maquillaje de fiesta", image: "/maquillaje-de-fiesta.webp" },
      { name: "Maquillaje casual", image: "/maquillaje-casual.webp" },
      { name: "Peinado", image: "/peinado.webp" },
    ],
  },
  {
    id: "hands-feet",
    title: "Manos y pies",
    headline: "Los detalles que te hacen lucir completa",
    image: "/hands-feet-main-image.jpg",
    blurb:
      "Manicure, pedicure y uñas esculpidas con productos premium. Porque cuidarte de pies a manos es el lujo que mereces cada semana.",
    services: [
      { name: "Mani spa", image: "/mani-spa.webp" },
      { name: "Mani express", image: "/mani-express.webp" },
      { name: "Gel semi permanente", image: "/gel-semi-permanente.webp" },
      {
        name: "Baño de acrílico o poligel",
        image: "/baño-de-acrilico-poligel.webp",
      },
      { name: "Pedi spa", image: "/padi-spa.webp" },
      { name: "Baby boomer", image: "/babyboomer.webp" },
      { name: "Uñas acrílicas", image: "/uñas-acrilicas.webp" },
      { name: "Uñas esculturales", image: "/uñas-esculturales.webp" },
    ],
  },
];

const activeId = ref(categories[0].id);
const bookingStore = useBookingStore();

// Plain arrays — only used for imperative DOM calls, no reactivity needed.
const tabButtons: (HTMLButtonElement | null)[] = [];
const carouselTracks: Record<string, HTMLUListElement | null> = {};

function selectTab(id: string): void {
  activeId.value = id;
}

function onTabKeydown(event: KeyboardEvent, index: number): void {
  let next = -1;
  if (event.key === "ArrowRight") next = (index + 1) % categories.length;
  else if (event.key === "ArrowLeft")
    next = (index - 1 + categories.length) % categories.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = categories.length - 1;
  else return;

  event.preventDefault();
  selectTab(categories[next].id);
  tabButtons[next]?.focus();
}

function scrollCarousel(serviceId: string, direction: "prev" | "next"): void {
  const track = carouselTracks[serviceId];
  if (!track) return;

  const items = track.querySelectorAll<HTMLLIElement>("li");
  if (items.length < 2) return;

  // Compute step as card width + gap from the live positions of the first two items.
  const step =
    items[1].getBoundingClientRect().left -
    items[0].getBoundingClientRect().left;
  track.scrollBy({
    left: direction === "next" ? step : -step,
    behavior: "smooth",
  });
}
</script>

<template>
  <section class="services" id="servicios" aria-labelledby="services-title">
    <header class="services__header">
      <p class="services__eyebrow">Lo que ofrecemos</p>
      <h2 id="services-title" class="services__title">Nuestros servicios</h2>
    </header>

    <!-- Tab navigation -->
    <div class="tab-nav" role="tablist" aria-label="Categorías de servicios">
      <button
        v-for="(category, index) in categories"
        :key="category.id"
        :id="`tab-${category.id}`"
        :ref="
          (el) => {
            tabButtons[index] = el as HTMLButtonElement | null;
          }
        "
        role="tab"
        :aria-selected="activeId === category.id"
        :aria-controls="`panel-${category.id}`"
        :tabindex="activeId === category.id ? 0 : -1"
        class="tab-nav__button"
        :class="{ 'is-active': activeId === category.id }"
        @click="selectTab(category.id)"
        @keydown="onTabKeydown($event, index)"
      >
        {{ category.title }}
      </button>
    </div>

    <!-- Tab panels -->
    <div
      v-for="category in categories"
      :key="`panel-${category.id}`"
      :id="`panel-${category.id}`"
      role="tabpanel"
      :aria-labelledby="`tab-${category.id}`"
      v-show="activeId === category.id"
      class="tab-panel"
    >
      <!-- Headline + blurb (left) and representative image (right, large screens only) -->
      <div class="tab-panel__hero">
        <div class="tab-panel__text">
          <h3 class="tab-panel__headline">{{ category.headline }}</h3>
          <p class="tab-panel__blurb">{{ category.blurb }}</p>
        </div>
        <img
          :src="category.image"
          :alt="`${category.title} en nuestro salón`"
          class="tab-panel__image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Service card carousel -->
      <div
        class="carousel"
        role="region"
        :aria-label="`Servicios de ${category.title}`"
      >
        <ul
          class="carousel__track"
          :ref="
            (el) => {
              carouselTracks[category.id] = el as HTMLUListElement | null;
            }
          "
        >
          <li
            v-for="service in category.services"
            :key="service.name"
            class="carousel__item"
          >
            <article class="service-card">
              <img
                v-if="service.image"
                :src="service.image"
                :alt="service.name"
                class="service-card__image"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="service-card__image" aria-hidden="true"></div>
              <div class="service-card__footer">
                <p class="service-card__name">{{ service.name }}</p>
                <button
                  type="button"
                  class="service-card__book-btn"
                  :aria-label="`Agendar ${service.name}`"
                  @click="bookingStore.openModal(service.name)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                    />
                  </svg>
                </button>
              </div>
            </article>
          </li>
        </ul>

        <div class="carousel__controls">
          <button
            type="button"
            class="carousel__btn"
            :aria-label="`Servicios anteriores de ${category.title}`"
            @click="scrollCarousel(category.id, 'prev')"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            class="carousel__btn"
            :aria-label="`Siguientes servicios de ${category.title}`"
            @click="scrollCarousel(category.id, 'next')"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ──────────────────────────────────────────── */
.services {
  padding: var(--space-lg) var(--space-md);
  background-color: var(--color-surface-muted);
}

.services__header {
  max-width: 40rem;
  margin: 0 auto var(--space-md);
  text-align: center;
}

.services__eyebrow {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: clamp(0.75rem, 1.5vw, 0.95rem);
  color: var(--color-primary-dark);
}

.services__title {
  margin: 0;
  font-size: clamp(1.75rem, 5vw, 3rem);
  color: var(--color-ink);
}

/* ── Tab nav ──────────────────────────────────────────── */
.tab-nav {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 2px solid var(--color-accent);
  max-width: 75rem;
  margin: 0 auto var(--space-md);
}

.tab-nav::-webkit-scrollbar {
  display: none;
}

.tab-nav__button {
  flex: 0 0 auto;
  padding: clamp(0.6rem, 1.5vw, 0.85rem) clamp(1rem, 3vw, 1.75rem);
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px; /* sits on top of the nav's border */
  cursor: pointer;
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2vw, 1.05rem);
  font-weight: 500;
  color: var(--color-ink);
  white-space: nowrap;
  transition:
    color 0.15s ease,
    border-color 0.15s ease;
}

.tab-nav__button:hover {
  color: var(--color-primary);
}

.tab-nav__button.is-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 700;
}

.tab-nav__button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ── Tab panel ────────────────────────────────────────── */
.tab-panel {
  max-width: 75rem;
  margin: 0 auto;
}

/* ── Hero row ─────────────────────────────────────────── */
.tab-panel__hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  align-items: center;
}

@media (min-width: 60rem) {
  .tab-panel__hero {
    grid-template-columns: 3fr 2fr;
  }
}

.tab-panel__headline {
  margin: 0 0 var(--space-sm);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--color-ink);
}

.tab-panel__blurb {
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  max-width: 52ch;
}

/* Hidden on small screens; shown only on large screens */
.tab-panel__image {
  display: none;
  width: 100%;
  border-radius: 1.25rem;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

@media (min-width: 60rem) {
  .tab-panel__image {
    display: block;
  }
}

/* ── Carousel ─────────────────────────────────────────── */
.carousel__track {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  margin: 0;
  padding: 0.25rem 0 var(--space-sm);
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}

.carousel__track::-webkit-scrollbar {
  height: 4px;
}

.carousel__track::-webkit-scrollbar-thumb {
  background-color: var(--color-accent);
  border-radius: 2px;
}

.carousel__item {
  flex: 0 0 auto;
  width: clamp(10rem, 28vw, 14rem);
  scroll-snap-align: start;
}

/* ── Carousel controls ────────────────────────────────── */
.carousel__controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: var(--space-sm);
}

.carousel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 2px solid var(--color-primary);
  background-color: transparent;
  color: var(--color-primary);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.carousel__btn:hover {
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.carousel__btn:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

/* ── Service card ─────────────────────────────────────── */
.service-card {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--color-surface);
  box-shadow: 0 2px 12px rgba(43, 32, 36, 0.08);
}

.service-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  background-color: var(--color-surface-muted);
  /* Striped placeholder; only visible on the <div> fallback (no image). */
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 8px,
    rgba(183, 110, 121, 0.15) 8px,
    rgba(183, 110, 121, 0.15) 9px
  );
}

.service-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
}

.service-card__name {
  margin: 0;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 500;
  color: var(--color-ink);
  min-width: 0;
}

.service-card__book-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(1.9rem, 5vw, 2.2rem);
  height: clamp(1.9rem, 5vw, 2.2rem);
  border: none;
  border-radius: 50%;
  background-color: var(--color-surface-muted);
  color: var(--color-primary);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.service-card__book-btn svg {
  width: 100%;
  height: 100%;
  color: var(--color-icon-muted);
}

.service-card__book-btn:hover {
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.service-card__book-btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
