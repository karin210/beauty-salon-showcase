<script setup lang="ts">
import { computed, ref } from "vue";
import { useBookingStore } from "~/stores/bookings";

const bookingStore = useBookingStore();

const lightboxDialog = ref<HTMLDialogElement | null>(null);
const lightboxImage = ref<{ src: string; alt: string; caption: string } | null>(null);

function openLightbox(src: string, alt: string, caption: string): void {
  lightboxImage.value = { src, alt, caption };
  lightboxDialog.value?.showModal();
}

function closeLightbox(): void {
  lightboxDialog.value?.close();
  lightboxImage.value = null;
}

function onLightboxClick(event: MouseEvent): void {
  if (event.target === lightboxDialog.value) closeLightbox();
}

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatBookingDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} de ${d.getFullYear()}`;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const upcomingBookings = computed(() =>
  [...bookingStore.bookings].sort((a, b) => a.date.getTime() - b.date.getTime())
);

type Urgency = "soon" | "upcoming" | "later";

interface ServiceEntry {
  name: string;
  date: string;
  dateTime: string;
  image?: string;
}

interface Reminder {
  service: string;
  note: string;
  suggestedDate: string;
  suggestedDateTime: string;
  urgency: Urgency;
}

const user = {
  name: "Valentina Morales",
  phone: "+52 443 156 7890",
  phoneHref: "tel:+524431567890",
  email: "valentina.morales@correo.com",
  emailHref: "mailto:valentina.morales@correo.com",
};

const lastService: ServiceEntry = {
  name: "Tinte completo + hidratación profunda",
  date: "3 de mayo de 2026",
  dateTime: "2026-05-03",
};

const styleHistory: ServiceEntry[] = [
  { name: "Tinte completo + hidratación profunda", date: "3 de mayo de 2026", dateTime: "2026-05-03", image: "/tinte-completo.jpg" },
  { name: "Retoque de raíces", date: "15 de marzo de 2026", dateTime: "2026-03-15", image: "/retoque-de-raiz.png" },
  { name: "Corte + tratamiento de keratina", date: "18 de enero de 2026", dateTime: "2026-01-18", image: "/keratina-corte.png" },
  { name: "Tinte completo + corte", date: "5 de noviembre de 2025", dateTime: "2025-11-05", image: "/corte-tinte.png" },
];

const reminders: Reminder[] = [
  {
    service: "Retoque de raíces",
    note: "Las raíces suelen crecer en 4–6 semanas. ¡Ya casi es momento!",
    suggestedDate: "14 de junio de 2026",
    suggestedDateTime: "2026-06-14",
    urgency: "soon",
  },
  {
    service: "Tratamiento de hidratación",
    note: "Mantén el brillo y la salud de tu cabello después del tinte.",
    suggestedDate: "21 de junio de 2026",
    suggestedDateTime: "2026-06-21",
    urgency: "upcoming",
  },
  {
    service: "Recorte de puntas",
    note: "Recomendado cada 6–8 semanas para evitar el quiebre.",
    suggestedDate: "5 de julio de 2026",
    suggestedDateTime: "2026-07-05",
    urgency: "later",
  },
];

const urgencyLabel: Record<Urgency, string> = {
  soon: "Pronto",
  upcoming: "Próximamente",
  later: "Más adelante",
};
</script>

<template>
  <SiteHeader />
  <main class="profile-page">
    <div class="profile-container">

      <section class="profile-card" aria-labelledby="profile-name">
        <div class="profile-avatar" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div class="profile-info">
          <h1 id="profile-name" class="profile-name">{{ user.name }}</h1>
          <ul class="profile-contact">
            <li>
              <a :href="user.phoneHref" class="profile-contact__link">{{ user.phone }}</a>
            </li>
            <li>
              <a :href="user.emailHref" class="profile-contact__link">{{ user.email }}</a>
            </li>
          </ul>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" class="profile-section__heading">Próximas citas</h2>
        <p v-if="upcomingBookings.length === 0" class="upcoming-empty">
          No tienes citas agendadas. ¡Reserva un servicio desde la página principal!
        </p>
        <ul v-else class="upcoming-list">
          <li
            v-for="booking in upcomingBookings"
            :key="booking.id"
            class="upcoming-card"
          >
            <span class="upcoming-card__service">{{ booking.serviceName }}</span>
            <div class="upcoming-card__meta">
              <time class="upcoming-card__date" :datetime="isoDate(booking.date)">
                {{ formatBookingDate(booking.date) }}
              </time>
              <span class="upcoming-card__time">{{ booking.time }}</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="profile-section" aria-labelledby="last-service-heading">
        <h2 id="last-service-heading" class="profile-section__heading">Último servicio</h2>
        <article class="service-highlight">
          <span class="service-highlight__name">{{ lastService.name }}</span>
          <time class="service-highlight__date" :datetime="lastService.dateTime">{{ lastService.date }}</time>
        </article>
      </section>

      <section class="profile-section" aria-labelledby="history-heading">
        <h2 id="history-heading" class="profile-section__heading profile-section__heading--action">
          Ver historial de estilos
        </h2>
        <ol class="history-list">
          <li
            v-for="(entry, index) in styleHistory"
            :key="index"
            class="history-list__item"
          >
            <button
              v-if="entry.image"
              type="button"
              class="history-list__image-button"
              :aria-label="`Ampliar imagen del servicio: ${entry.name}`"
              @click="openLightbox(entry.image, `Resultado del servicio: ${entry.name}`, entry.name)"
            >
              <img
                class="history-list__image"
                :src="entry.image"
                :alt="`Resultado del servicio: ${entry.name}`"
                loading="lazy"
              />
            </button>
            <div class="history-list__details">
              <span class="history-list__name">{{ entry.name }}</span>
              <time class="history-list__date" :datetime="entry.dateTime">{{ entry.date }}</time>
            </div>
          </li>
        </ol>
      </section>

      <section class="profile-section" aria-labelledby="reminders-heading">
        <h2 id="reminders-heading" class="profile-section__heading">Recordatorios</h2>
        <p class="reminders-description">
          Retoques y tratamientos sugeridos según tu último servicio.
        </p>
        <ul class="reminders-list">
          <li
            v-for="(reminder, index) in reminders"
            :key="index"
            class="reminder-card"
            :data-urgency="reminder.urgency"
          >
            <div class="reminder-card__header">
              <h3 class="reminder-card__title">{{ reminder.service }}</h3>
              <span class="reminder-card__badge">{{ urgencyLabel[reminder.urgency] }}</span>
            </div>
            <p class="reminder-card__note">{{ reminder.note }}</p>
            <p class="reminder-card__date-row">
              <span class="reminder-card__label">Sugerido para:</span>
              <time :datetime="reminder.suggestedDateTime">{{ reminder.suggestedDate }}</time>
            </p>
          </li>
        </ul>
      </section>

    </div>
  </main>

  <dialog
    ref="lightboxDialog"
    class="image-lightbox"
    aria-label="Imagen ampliada del servicio"
    @cancel.prevent="closeLightbox"
    @click="onLightboxClick"
  >
    <figure v-if="lightboxImage" class="image-lightbox__inner">
      <button
        type="button"
        class="image-lightbox__close"
        aria-label="Cerrar"
        @click="closeLightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img class="image-lightbox__image" :src="lightboxImage.src" :alt="lightboxImage.alt" />
      <figcaption class="image-lightbox__caption">{{ lightboxImage.caption }}</figcaption>
    </figure>
  </dialog>

  <SiteFooter />
</template>

<!-- backdrop is in the top layer — scoped attributes don't reach it -->
<style>
dialog.image-lightbox::backdrop {
  background-color: var(--color-overlay);
  backdrop-filter: blur(3px);
}
</style>

<style scoped>
/* ==========================================
   Page layout
   ========================================== */

.profile-page {
  box-sizing: border-box;
  background-color: var(--color-surface-muted);
  min-height: 100vh;
  padding-block: var(--space-lg);
}

.profile-container {
  box-sizing: border-box;
  max-width: 48rem;
  margin-inline: auto;
  padding-inline: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* ==========================================
   User info card
   ========================================== */

.profile-card {
  background-color: var(--color-surface);
  border-radius: 1rem;
  padding: var(--space-md);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  box-shadow: 0 2px 16px rgba(43, 32, 36, 0.08);
}

.profile-avatar {
  flex-shrink: 0;
  width: clamp(4.5rem, 12vw, 6rem);
  height: clamp(4.5rem, 12vw, 6rem);
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-on-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar svg {
  width: 52%;
  height: 52%;
}

.profile-info {
  min-width: 0;
}

.profile-name {
  font-family: var(--font-heading);
  font-size: clamp(1.3rem, 4vw, 1.9rem);
  color: var(--color-ink);
  margin: 0 0 0.4em;
  line-height: 1.15;
}

.profile-contact {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.profile-contact__link {
  color: var(--color-primary-dark);
  text-decoration: none;
  font-size: clamp(0.82rem, 2vw, 0.96rem);
}

.profile-contact__link:hover {
  text-decoration: underline;
}

.profile-contact__link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ==========================================
   Shared section wrapper
   ========================================== */

.profile-section {
  background-color: var(--color-surface);
  border-radius: 1rem;
  padding: var(--space-md);
  box-shadow: 0 2px 16px rgba(43, 32, 36, 0.08);
}

.profile-section__heading {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2.8vw, 1.25rem);
  color: var(--color-ink);
  margin: 0 0 var(--space-sm);
}

.profile-section__heading--action {
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.profile-section__heading--action::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 1.1em;
  background-color: var(--color-primary);
  border-radius: 2px;
  flex-shrink: 0;
}

/* ==========================================
   Last service highlight
   ========================================== */

.service-highlight {
  background-color: var(--color-surface-muted);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.service-highlight__name {
  font-size: clamp(0.88rem, 2.2vw, 1rem);
  font-weight: 600;
  color: var(--color-ink);
}

.service-highlight__date {
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  color: var(--color-primary-dark);
}

/* ==========================================
   Style history list
   ========================================== */

.history-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.history-list__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  padding-block: var(--space-sm);
  border-bottom: 1px solid var(--color-surface-muted);
}

.history-list__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.history-list__image-button {
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.5rem;
  line-height: 0;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.history-list__image-button:hover {
  transform: scale(1.04);
  box-shadow: 0 4px 14px rgba(43, 32, 36, 0.18);
}

.history-list__image-button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.history-list__image {
  width: clamp(3.5rem, 14vw, 5rem);
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.5rem;
  display: block;
}

.history-list__details {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.history-list__name {
  font-size: clamp(0.85rem, 2.2vw, 0.98rem);
  color: var(--color-ink);
}

.history-list__date {
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  color: var(--color-primary-dark);
  white-space: nowrap;
}

/* ==========================================
   Reminders
   ========================================== */

.reminders-description {
  font-size: clamp(0.82rem, 2vw, 0.92rem);
  color: var(--color-ink);
  margin: 0 0 var(--space-sm);
}

.reminders-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.reminder-card {
  background-color: var(--color-surface-muted);
  border-radius: 0.5rem;
  padding: var(--space-sm) var(--space-md);
  border-left: 4px solid var(--color-border);
}

.reminder-card[data-urgency="soon"] {
  border-left-color: var(--color-primary);
}

.reminder-card[data-urgency="upcoming"] {
  border-left-color: var(--color-accent);
}

.reminder-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.reminder-card__title {
  font-family: var(--font-heading);
  font-size: clamp(0.9rem, 2.4vw, 1.05rem);
  font-weight: 600;
  color: var(--color-ink);
  margin: 0;
}

.reminder-card__badge {
  flex-shrink: 0;
  font-size: clamp(0.7rem, 1.5vw, 0.78rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2em 0.65em;
  border-radius: 2em;
  background-color: var(--color-surface);
  color: var(--color-ink);
}

.reminder-card[data-urgency="soon"] .reminder-card__badge {
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.reminder-card[data-urgency="upcoming"] .reminder-card__badge {
  background-color: var(--color-accent);
  color: var(--color-ink);
}

.reminder-card__note {
  font-size: clamp(0.82rem, 2vw, 0.92rem);
  color: var(--color-ink);
  margin: 0 0 0.5rem;
  line-height: 1.55;
}

.reminder-card__date-row {
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  color: var(--color-primary-dark);
  margin: 0;
  display: flex;
  gap: 0.4em;
  flex-wrap: wrap;
}

.reminder-card__label {
  font-weight: 600;
}

/* ==========================================
   Próximas citas
   ========================================== */

.upcoming-empty {
  font-size: clamp(0.82rem, 2vw, 0.92rem);
  color: var(--color-ink);
  margin: 0;
  opacity: 0.7;
}

.upcoming-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.upcoming-card {
  background-color: var(--color-surface-muted);
  border-left: 4px solid var(--color-primary);
  border-radius: 0 0.5rem 0.5rem 0;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.4rem;
}

.upcoming-card__service {
  font-size: clamp(0.88rem, 2.2vw, 1rem);
  font-weight: 600;
  color: var(--color-ink);
  width: 100%;
}

.upcoming-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.upcoming-card__date {
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  color: var(--color-primary-dark);
  text-transform: capitalize;
}

.upcoming-card__time {
  font-size: clamp(0.78rem, 1.8vw, 0.88rem);
  font-weight: 700;
  color: var(--color-primary-dark);
  background-color: var(--color-surface);
  border-radius: 2em;
  padding: 0.15em 0.7em;
}

/* ==========================================
   Image lightbox
   ========================================== */

.image-lightbox {
  border: none;
  padding: 0;
  background: transparent;
  max-width: 92vw;
  max-height: 92vh;
  overflow: visible;
}

.image-lightbox__inner {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.image-lightbox__image {
  display: block;
  max-width: 92vw;
  max-height: 82vh;
  width: auto;
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 8px 40px rgba(43, 32, 36, 0.4);
}

.image-lightbox__caption {
  font-family: var(--font-heading);
  font-size: clamp(0.9rem, 2.4vw, 1.15rem);
  color: var(--color-on-dark);
  text-align: center;
  margin: 0;
  max-width: 92vw;
}

.image-lightbox__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: var(--color-surface);
  color: var(--color-ink);
  box-shadow: 0 2px 8px rgba(43, 32, 36, 0.25);
  transition: background-color 0.15s ease;
}

.image-lightbox__close svg {
  width: 1.2rem;
  height: 1.2rem;
}

.image-lightbox__close:hover {
  background-color: var(--color-surface-muted);
}

.image-lightbox__close:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
