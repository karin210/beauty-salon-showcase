<script setup lang="ts">
import { computed } from "vue";
import { useBookingStore } from "~/stores/bookings";

const bookingStore = useBookingStore();

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
  { name: "Tinte completo + hidratación profunda", date: "3 de mayo de 2026", dateTime: "2026-05-03" },
  { name: "Retoque de raíces", date: "15 de marzo de 2026", dateTime: "2026-03-15" },
  { name: "Corte + tratamiento de keratina", date: "18 de enero de 2026", dateTime: "2026-01-18" },
  { name: "Tinte completo + corte", date: "5 de noviembre de 2025", dateTime: "2025-11-05" },
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
            <span class="history-list__name">{{ entry.name }}</span>
            <time class="history-list__date" :datetime="entry.dateTime">{{ entry.date }}</time>
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
  <SiteFooter />
</template>

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
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding-block: var(--space-sm);
  border-bottom: 1px solid var(--color-surface-muted);
}

.history-list__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
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
</style>
