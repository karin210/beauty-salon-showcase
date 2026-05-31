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

  function add(serviceName: string, date: Date, time: string): void {
    bookings.value.push({ id: crypto.randomUUID(), serviceName, date, time });
  }

  return { bookings, add };
});
