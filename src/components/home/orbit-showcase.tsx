"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ProductArt } from "@/components/product/product-art";
import { getProductBySlug } from "@/data/products";

const ORBIT_SLUGS = [
  "macbook-air-m3",
  "rgb-wireless-mouse",
  "rgb-mechanical-keyboard",
  "wireless-gaming-headset",
  "curved-gaming-monitor",
] as const;

const items = ORBIT_SLUGS.map((slug) => getProductBySlug(slug)!);

const RADIUS_X = 200;
const RADIUS_Y = 46;
const ORBIT_SECONDS = 26;

export function OrbitShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  useGSAP(
    () => {
      // Intro: each product flips into its orbit slot in sequence.
      const tl = gsap.timeline();
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.fromTo(
          card,
          { opacity: 0, scale: 0.3, rotateY: -110 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.7)" },
          i * 0.35
        );
      });

      // Continuous slow orbit — paused while any card is hovered.
      const ticker = (_time: number, deltaMs: number) => {
        if (hoveredRef.current === null) {
          angleRef.current += (deltaMs / 1000 / ORBIT_SECONDS) * Math.PI * 2;
        }
        items.forEach((_, i) => {
          const card = cardRefs.current[i];
          if (!card) return;

          if (hoveredRef.current === i) {
            gsap.set(card, { x: 0, y: -10, scale: 1.35, zIndex: 50, opacity: 1 });
            return;
          }

          const angle = angleRef.current + (i / items.length) * Math.PI * 2;
          const depth = (Math.sin(angle) + 1) / 2; // 0 back, 1 front
          gsap.set(card, {
            x: Math.cos(angle) * RADIUS_X,
            y: Math.sin(angle) * RADIUS_Y,
            scale: 0.65 + depth * 0.55,
            opacity: 0.5 + depth * 0.5,
            zIndex: Math.round(depth * 100),
          });
        });
      };

      gsap.ticker.add(ticker);
      return () => gsap.ticker.remove(ticker);
    },
    { scope: stageRef }
  );

  return (
    <div
      ref={stageRef}
      className="relative mx-auto h-[380px] w-full max-w-md sm:h-[440px]"
      style={{ perspective: "1200px" }}
    >
      {items.map((item, i) => (
        <Link
          key={item.slug}
          href={`/product/${item.slug}`}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onMouseEnter={() => (hoveredRef.current = i)}
          onMouseLeave={() => (hoveredRef.current = null)}
          className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 sm:w-32"
        >
          <div className="rgb-glow absolute -inset-2 rounded-2xl opacity-70 blur-md" style={{
            background: "conic-gradient(from 0deg, #22d3ee, #a855f7, #f43f5e, #fbbf24, #34d399, #22d3ee)",
          }} />
          <ProductArt product={item} className="relative aspect-square w-full" sizes="160px" />
          <p className="relative mt-2 text-center text-xs font-medium text-foreground">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}
