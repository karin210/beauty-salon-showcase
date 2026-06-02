import { defineStore } from "pinia";
import { ref } from "vue";

export interface Booking {
  id: string;
  serviceName: string;
  date: Date;
  time: string;
}

export const useBookingStore = defineStore("bookings", () => {
  const bookings = ref<Booking[]>([]);

  // Booking modal UI state, shared so any component (hero CTA, service cards)
  // can open it for a given service.
  const isModalOpen = ref(false);
  const activeService = ref("");

  function openModal(serviceName: string): void {
    activeService.value = serviceName;
    isModalOpen.value = true;
  }

  function closeModal(): void {
    isModalOpen.value = false;
  }

  function add(serviceName: string, date: Date, time: string): void {
    bookings.value.push({ id: crypto.randomUUID(), serviceName, date, time });
  }

  return { bookings, isModalOpen, activeService, openModal, closeModal, add };
});
