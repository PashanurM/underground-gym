"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Booking } from "@/lib/types";

const BOOKINGS_KEY = "forge-bookings";

type BookingContextValue = {
  bookings: Booking[];
  ready: boolean;
  createBooking: (
    input: Omit<Booking, "id" | "createdAt" | "status">,
  ) => Booking;
  updateBookingStatus: (
    id: string,
    status: Booking["status"],
  ) => void;
  cancelBooking: (id: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKINGS_KEY);
      if (raw) setBookings(JSON.parse(raw) as Booking[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const createBooking = useCallback(
    (input: Omit<Booking, "id" | "createdAt" | "status">) => {
      const booking: Booking = {
        ...input,
        id: `bk-${Date.now()}`,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => {
        const next = [booking, ...prev];
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
        return next;
      });
      return booking;
    },
    [],
  );

  const updateBookingStatus = useCallback((id: string, status: Booking["status"]) => {
    setBookings((prev) => {
      const next = prev.map((b) => (b.id === id ? { ...b, status } : b));
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const cancelBooking = useCallback(
    (id: string) => {
      updateBookingStatus(id, "cancelled");
    },
    [updateBookingStatus],
  );

  const value = useMemo(
    () => ({
      bookings,
      ready,
      createBooking,
      updateBookingStatus,
      cancelBooking,
    }),
    [bookings, ready, createBooking, updateBookingStatus, cancelBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within BookingProvider");
  return ctx;
}
