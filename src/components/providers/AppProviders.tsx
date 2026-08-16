"use client";

import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import { TrainerShareProvider } from "@/context/TrainerShareContext";
import { AosProvider } from "@/components/providers/AosProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BookingProvider>
        <TrainerShareProvider>
          <SmoothScroll>
            <AosProvider>{children}</AosProvider>
          </SmoothScroll>
        </TrainerShareProvider>
      </BookingProvider>
    </AuthProvider>
  );
}
