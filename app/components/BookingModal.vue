<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  serviceName: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

type Step = "date" | "time" | "confirm";

const step = ref<Step>("date");
const selectedDate = ref<Date | null>(null);
const selectedTime = ref<string>("");
const dialogEl = ref<HTMLDialogElement | null>(null);

watch(() => props.modelValue, (open) => {
  if (open) {
    step.value = "date";
    selectedDate.value = null;
    selectedTime.value = "";
    dialogEl.value?.showModal();
  } else {
    dialogEl.value?.close();
  }
});

function close(): void {
  emit("update:modelValue", false);
}

function onDateSelect(date: Date): void {
  selectedDate.value = date;
  step.value = "time";
}

function onTimeSelect(time: string): void {
  selectedTime.value = time;
  step.value = "confirm";
  setTimeout(close, 2000);
}

function onDialogClick(event: MouseEvent): void {
  if (event.target === dialogEl.value) close();
}
</script>

<template>
  <dialog
    ref="dialogEl"
    class="booking-modal"
    aria-labelledby="booking-modal-title"
    @cancel.prevent="close"
    @click="onDialogClick"
  >
    <div class="booking-modal__inner">
      <header class="booking-modal__header">
        <div class="booking-modal__titles">
          <h2 id="booking-modal-title" class="booking-modal__title">
            {{ step === "confirm" ? "¡Cita agendada!" : "Agendar cita" }}
          </h2>
          <p class="booking-modal__service">{{ serviceName }}</p>
        </div>
        <button
          type="button"
          class="booking-modal__close"
          aria-label="Cerrar"
          @click="close"
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
      </header>

      <div class="booking-modal__body">
        <BookingDatePicker
          v-if="step === 'date'"
          @select="onDateSelect"
        />
        <BookingTimePicker
          v-else-if="step === 'time' && selectedDate"
          :date="selectedDate"
          @select="onTimeSelect"
          @back="step = 'date'"
        />
        <div v-else-if="step === 'confirm'" class="booking-modal__confirm">
          <span class="booking-modal__confirm-icon" aria-hidden="true">✓</span>
          <p class="booking-modal__confirm-text">
            Tu cita para las <strong>{{ selectedTime }}</strong> ha sido registrada.
            Te contactaremos pronto para confirmarte.
          </p>
        </div>
      </div>
    </div>
  </dialog>
</template>

<!-- backdrop is in the top layer — scoped attributes don't reach it -->
<style>
dialog.booking-modal::backdrop {
  background-color: var(--color-overlay);
  backdrop-filter: blur(3px);
}
</style>

<style scoped>
.booking-modal {
  border: none;
  border-radius: 1.25rem;
  padding: 0;
  width: min(28rem, 94vw);
  background-color: var(--color-surface);
  box-shadow: 0 8px 40px rgba(43, 32, 36, 0.22);
  color: var(--color-ink);
}

.booking-modal[open] {
  display: flex;
  flex-direction: column;
}

.booking-modal__inner {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
}

.booking-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.booking-modal__titles {
  min-width: 0;
}

.booking-modal__title {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  color: var(--color-ink);
  margin: 0 0 0.15em;
}

.booking-modal__service {
  font-size: clamp(0.82rem, 2vw, 0.9rem);
  color: var(--color-primary-dark);
  margin: 0;
}

.booking-modal__close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-ink);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.15s ease;
}

.booking-modal__close svg {
  width: 1.1rem;
  height: 1.1rem;
}

.booking-modal__close:hover {
  background-color: var(--color-surface-muted);
}

.booking-modal__close:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.booking-modal__body {
  flex: 1;
}

.booking-modal__confirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding-block: var(--space-md);
  text-align: center;
}

.booking-modal__confirm-icon {
  width: clamp(4rem, 12vw, 5rem);
  height: clamp(4rem, 12vw, 5rem);
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-on-dark);
  font-size: clamp(2rem, 6vw, 2.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-modal__confirm-text {
  font-size: clamp(0.88rem, 2.2vw, 1rem);
  color: var(--color-ink);
  max-width: 28ch;
  margin: 0;
  line-height: 1.6;
}
</style>
