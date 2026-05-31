<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits<{ select: [date: Date] }>();

const today = new Date();
today.setHours(0, 0, 0, 0);

const viewYear = ref(today.getFullYear());
const viewMonth = ref(today.getMonth());

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const DAY_HEADERS = ["L", "M", "X", "J", "V", "S", "D"];

const monthLabel = computed(() => `${MONTH_NAMES[viewMonth.value]} ${viewYear.value}`);

const calendarCells = computed<(number | null)[]>(() => {
  const year = viewYear.value;
  const month = viewMonth.value;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rawFirst = new Date(year, month, 1).getDay();
  const startOffset = (rawFirst + 6) % 7; // Monday-first
  const cells: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
});

function isPast(day: number): boolean {
  return new Date(viewYear.value, viewMonth.value, day) < today;
}

function prevMonth(): void {
  if (viewMonth.value === 0) { viewYear.value--; viewMonth.value = 11; }
  else viewMonth.value--;
}

function nextMonth(): void {
  if (viewMonth.value === 11) { viewYear.value++; viewMonth.value = 0; }
  else viewMonth.value++;
}

function selectDay(day: number | null): void {
  if (!day || isPast(day)) return;
  emit("select", new Date(viewYear.value, viewMonth.value, day));
}
</script>

<template>
  <div class="date-picker">
    <div class="date-picker__nav">
      <button type="button" class="date-picker__nav-btn" aria-label="Mes anterior" @click="prevMonth">‹</button>
      <span class="date-picker__month-label">{{ monthLabel }}</span>
      <button type="button" class="date-picker__nav-btn" aria-label="Mes siguiente" @click="nextMonth">›</button>
    </div>

    <div class="date-picker__grid" role="grid" :aria-label="monthLabel">
      <div
        v-for="d in DAY_HEADERS"
        :key="d"
        class="date-picker__day-header"
        role="columnheader"
        aria-hidden="true"
      >{{ d }}</div>

      <button
        v-for="(cell, i) in calendarCells"
        :key="i"
        type="button"
        role="gridcell"
        class="date-picker__cell"
        :class="{
          'date-picker__cell--empty': !cell,
          'date-picker__cell--past': cell !== null && isPast(cell),
        }"
        :disabled="!cell || isPast(cell)"
        :aria-label="cell ? `${cell} de ${monthLabel}` : undefined"
        :tabindex="cell && !isPast(cell) ? 0 : -1"
        @click="selectDay(cell)"
      >
        <span v-if="cell">{{ cell }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.date-picker {
  width: 100%;
}

.date-picker__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}

.date-picker__nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: var(--color-primary);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.15s ease;
}

.date-picker__nav-btn:hover {
  background-color: var(--color-surface-muted);
}

.date-picker__nav-btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.date-picker__month-label {
  font-family: var(--font-heading);
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  font-weight: 600;
  color: var(--color-ink);
  text-align: center;
}

.date-picker__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.date-picker__day-header {
  text-align: center;
  font-size: clamp(0.7rem, 1.5vw, 0.78rem);
  font-weight: 700;
  color: var(--color-primary-dark);
  padding-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.date-picker__cell {
  aspect-ratio: 1;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: var(--color-ink);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.12s ease, color 0.12s ease;
}

.date-picker__cell:not(.date-picker__cell--empty):not(.date-picker__cell--past):hover {
  background-color: var(--color-primary);
  color: var(--color-on-dark);
}

.date-picker__cell:not(:disabled):focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
}

.date-picker__cell--past {
  color: var(--color-border);
  cursor: not-allowed;
}

.date-picker__cell--empty {
  pointer-events: none;
}
</style>
