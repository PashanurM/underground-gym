"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export type PriceCard = {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: string;
  description: string;
  details: string;
};

type Props = {
  items: PriceCard[];
  moreLabel: string;
  closeLabel: string;
};

export function PriceBoard({ items, moreLabel, closeLabel }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="price-board">
      {items.map((item, i) => {
        const open = openId === item.id;
        const flip = i % 2 === 1;
        const delay = Math.min(i * 40, 160);
        const textAos = flip ? "fade-right" : "fade-left";
        return (
          <article
            key={item.id}
            className={`price-row${flip ? " price-row-flip" : ""}${open ? " is-open" : ""}`}
          >
            <div
              className="price-row-media"
              data-aos="price-stretch"
              data-aos-duration="1400"
              data-aos-easing="ease-out-cubic"
              data-aos-delay={delay}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                priority={i === 0}
                quality={90}
                className="object-cover"
                sizes="100vw"
              />
              <div className="price-row-veil" />
            </div>
            <div className="price-row-copy">
              <span
                className="price-row-index"
                data-aos={textAos}
                data-aos-duration="800"
                data-aos-delay={220 + delay}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="price-row-text">
                <h2
                  className="price-row-name"
                  data-aos={textAos}
                  data-aos-duration="900"
                  data-aos-delay={280 + delay}
                >
                  {item.name}
                </h2>
                {item.description ? (
                  <p
                    className="price-row-desc"
                    data-aos={textAos}
                    data-aos-duration="1100"
                    data-aos-delay={420 + delay}
                  >
                    {item.description}
                  </p>
                ) : null}
                {item.details ? (
                  <div
                    data-aos={textAos}
                    data-aos-duration="900"
                    data-aos-delay={500 + delay}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      className="price-row-more"
                      onClick={() => setOpenId(open ? null : item.id)}
                    >
                      {open ? closeLabel : moreLabel}
                    </Button>
                  </div>
                ) : null}
              </div>
              <p
                className="price-row-amount"
                data-aos={textAos}
                data-aos-duration="900"
                data-aos-delay={340 + delay}
              >
                {item.price}
              </p>
            </div>
            {item.details ? (
              <aside className="price-row-panel" aria-hidden={!open}>
                <p className="price-row-panel-kicker">{item.name}</p>
                <p className="price-row-panel-body">{item.details}</p>
              </aside>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
