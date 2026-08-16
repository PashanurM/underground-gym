"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; question: string; answer: string };

export function Accordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openId === item.id;
        return (
          <div
            key={item.id}
            className="card-glass px-5 md:px-6"
            data-aos="fade-up"
            data-aos-delay={i * 70}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
            >
              <span className="font-display text-2xl tracking-wide md:text-3xl">
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent text-xl transition-transform duration-300",
                  open && "rotate-45 border-accent",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-muted leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
