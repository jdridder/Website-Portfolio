"use client";

import { FloatingCard } from "@/components/ui/FloatingCard";
import { motion } from "framer-motion";
import { CircleStar, Trophy } from "lucide-react";

const HERO_LINES = [
  "Engineer.",
  "Researcher.",
  "Athlete.",
];

interface HeroSectionProps {
  gravityOn: boolean;
}

export function HeroSection({ gravityOn }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Radial glow behind hero */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <motion.div
        className="text-center z-10 mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="font-grotesk text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: "var(--primary)" }}
        >
          Jan-David Ridder / Chemical Engineer
        </p>
        <h1 className="font-grotesk font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-4">
          {HERO_LINES.map((line, i) => (
            <motion.span
              key={line}
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" }}
            >
              {i === 0 ? (
                <span style={{ color: "var(--primary)" }} className="text-glow">
                  {line}
                </span>
              ) : (
                <span className="text-primary">{line}</span>
              )}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="font-inter text-lg text-muted mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Physics-informed ML, model predictive control, and reaction & process engineering —
          built at competitive training intensity.
        </motion.p>
      </motion.div>

      {/* Mini stat cards */}
      <div className="py-20 grid grid-cols-1 sm:grid-cols-3 gap-4 z-10 w-full max-w-3xl">
        {[
          { label: "M.Sc. Avg Grade", value: "1.3" },
          { label: "B.Sc. Avg Grade", value: "1.5" },
          { label: "M.Sc. Thesis Grade", value: "1.0" },
          { label: "B.Sc. Thesis Grade", value: "1.0" },
          {
            label: "Best B.Sc degree 2023/24",
            value: <Trophy size={40} />
          },
          {
            label: "Deutschlandstipendium",
            value: <CircleStar size={40} />
          },
        ].map((stat, i) => (
          <FloatingCard
            key={stat.label}
            duration={3.5 + i * 0.8}
            gravityOn={gravityOn}
            className="text-center"
          >
            {/* ✅ FIX: use div instead of p */}
            <div
              className="flex justify-center items-center font-grotesk text-4xl font-bold text-glow"
              style={{ color: "var(--primary)" }}
            >
              {stat.value}
            </div>

            <p className="font-inter text-xs text-muted mt-2 tracking-widest uppercase">
              {stat.label}
            </p>
          </FloatingCard>
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-muted text-xs tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
