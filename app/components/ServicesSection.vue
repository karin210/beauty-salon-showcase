<script setup lang="ts">
import { ref } from 'vue';

interface Service {
  id: string;
  title: string;
  headline: string;
  blurb: string;
}

const CARD_COUNT = 7;

const services: Service[] = [
  {
    id: 'hair',
    title: 'Cabello',
    headline: 'Tu cabello, nuestra pasión',
    blurb: 'Desde cortes de autor hasta tratamientos de hidratación profunda, nuestras estilistas transforman tu cabello con técnica y dedicación. El look que siempre soñaste está a una visita de distancia.',
  },
  {
    id: 'lashes-brows',
    title: 'Pestañas y cejas',
    headline: 'Una mirada que lo dice todo',
    blurb: 'Pestañas que alargan y cejas que enmarcan tu rostro. Con extensiones, lifting y diseño personalizado, tus ojos brillan con luz propia sin esfuerzo adicional.',
  },
  {
    id: 'waxing',
    title: 'Depilación',
    headline: 'Piel suave, sin complicaciones',
    blurb: 'Depilación facial y corporal con cera de alta calidad para resultados duraderos. Saldrás sintiéndote fresca e impecable, lista para cualquier ocasión.',
  },
  {
    id: 'makeup',
    title: 'Maquillaje',
    headline: 'Luce perfecta en cada ocasión',
    blurb: 'Maquillaje profesional adaptado a tu estilo y al tipo de evento. Desde looks naturales para el día a día hasta propuestas espectaculares para tus momentos más especiales.',
  },
  {
    id: 'hands-feet',
    title: 'Manos y pies',
    headline: 'Los detalles que te hacen lucir completa',
    blurb: 'Manicure, pedicure y uñas esculpidas con productos premium. Porque cuidarte de pies a manos es el lujo que mereces cada semana.',
  },
];

const activeId = ref(services[0].id);

// Plain arrays — only used for imperative DOM calls, no reactivity needed.
const tabButtons: (HTMLButtonElement | null)[] = [];
const carouselTracks: Record<string, HTMLUListElement | null> = {};

function selectTab(id: string): void {
  activeId.value = id;
}

function onTabKeydown(event: KeyboardEvent, index: number): void {
  let next = -1;
  if (event.key === 'ArrowRight') next = (index + 1) % services.length;
  else if (event.key === 'ArrowLeft') next = (index - 1 + services.length) % services.length;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = services.length - 1;
  else return;

  event.preventDefault();
  selectTab(services[next].id);
  tabButtons[next]?.focus();
}

function scrollCarousel(serviceId: string, direction: 'prev' | 'next'): void {
  const track = carouselTracks[serviceId];
  if (!track) return;

  const items = track.querySelectorAll<HTMLLIElement>('li');
  if (items.length < 2) return;

  // Compute step as card width + gap from the live positions of the first two items.
  const step = items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
  track.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' });
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
        v-for="(service, index) in services"
        :key="service.id"
        :id="`tab-${service.id}`"
        :ref="(el) => { tabButtons[index] = el as HTMLButtonElement | null; }"
        role="tab"
        :aria-selected="activeId === service.id"
        :aria-controls="`panel-${service.id}`"
        :tabindex="activeId === service.id ? 0 : -1"
        class="tab-nav__button"
        :class="{ 'is-active': activeId === service.id }"
        @click="selectTab(service.id)"
        @keydown="onTabKeydown($event, index)"
      >
        {{ service.title }}
      </button>
    </div>

    <!-- Tab panels -->
    <div
      v-for="service in services"
      :key="`panel-${service.id}`"
      :id="`panel-${service.id}`"
      role="tabpanel"
      :aria-labelledby="`tab-${service.id}`"
      v-show="activeId === service.id"
      class="tab-panel"
    >
      <!-- Headline + blurb (left) and representative image (right, large screens only) -->
      <div class="tab-panel__hero">
        <div class="tab-panel__text">
          <h3 class="tab-panel__headline">{{ service.headline }}</h3>
          <p class="tab-panel__blurb">{{ service.blurb }}</p>
        </div>
        <div class="tab-panel__image" aria-hidden="true"></div>
      </div>

      <!-- Service card carousel -->
      <div
        class="carousel"
        role="region"
        :aria-label="`Servicios de ${service.title}`"
      >
        <ul
          class="carousel__track"
          :ref="(el) => { carouselTracks[service.id] = el as HTMLUListElement | null; }"
        >
          <li v-for="n in CARD_COUNT" :key="n" class="carousel__item">
            <article class="service-card" tabindex="0">
              <div class="service-card__image" aria-hidden="true"></div>
              <p class="service-card__name">Nombre del servicio</p>
            </article>
          </li>
        </ul>

        <div class="carousel__controls">
          <button
            type="button"
            class="carousel__btn"
            :aria-label="`Servicios anteriores de ${service.title}`"
            @click="scrollCarousel(service.id, 'prev')"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            class="carousel__btn"
            :aria-label="`Siguientes servicios de ${service.title}`"
            @click="scrollCarousel(service.id, 'next')"
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
  transition: color 0.15s ease, border-color 0.15s ease;
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
  border-radius: 1.25rem;
  aspect-ratio: 4 / 3;
  background-color: var(--color-accent);
  opacity: 0.4;
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
  transition: background-color 0.15s ease, color 0.15s ease;
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
  cursor: default;
}

.service-card:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.service-card__image {
  aspect-ratio: 3 / 4;
  background-color: var(--color-surface-muted);
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 8px,
    rgba(183, 110, 121, 0.15) 8px,
    rgba(183, 110, 121, 0.15) 9px
  );
}

.service-card__name {
  margin: 0;
  padding: 0.75rem;
  font-size: clamp(0.85rem, 2vw, 0.95rem);
  font-weight: 500;
  color: var(--color-ink);
}
</style>
