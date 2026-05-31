<script setup lang="ts">
const props = defineProps<{ date: Date }>();
const emit = defineEmits<{ select: [time: string]; back: [] }>();

const SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} de ${d.getFullYear()}`;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
</script>

<template>
  <div class="time-picker">
    <button type="button" class="time-picker__back" aria-label="Volver al calendario" @click="emit('back')">
      ← Cambiar fecha
    </button>

    <p class="time-picker__date-label">
      <time :datetime="isoDate(date)">{{ formatDate(date) }}</time>
    </p>

    <p class="time-picker__prompt">Elige un horario disponible:</p>

    <ul class="time-picker__slots">
      <li v-for="slot in SLOTS" :key="slot">
        <button
          type="button"
          class="time-picker__slot"
          :aria-label="`Agendar a las ${slot}`"
          @click="emit('select', slot)"
        >
          {{ slot }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.time-picker {
  width: 100%;
}

.time-picker__back {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-primary-dark);
  font-size: clamp(0.82rem, 2vw, 0.9rem);
  padding: 0;
  margin-bottom: var(--space-sm);
  display: flex;
  align-items: center;
  gap: 0.3em;
}

.time-picker__back:hover {
  text-decoration: underline;
}

.time-picker__back:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

.time-picker__date-label {
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  font-weight: 600;
  color: var(--color-ink);
  margin: 0 0 0.25rem;
  text-transform: capitalize;
}

.time-picker__prompt {
  font-size: clamp(0.82rem, 2vw, 0.9rem);
  color: var(--color-ink);
  margin: 0 0 var(--space-sm);
}

.time-picker__slots {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.time-picker__slot {
  width: 100%;
  padding: 0.6em 0;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: var(--color-surface);
  color: var(--color-ink);
  font-size: clamp(0.88rem, 2vw, 1rem);
  cursor: pointer;
  transition: border-color 0.12s ease, background-color 0.12s ease, color 0.12s ease;
}

.time-picker__slot:hover {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.time-picker__slot:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
