"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  LayoutGroup,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState } from "react";

// ─── Research interest taxonomy ───────────────────────────────────────────────
// weight 4 = flagship topic  |  3 = major interest  |  2 = sub-topic  |  1 = tool
const INTERESTS = [
  // --- Flagship topics (weight 4) ---
  { id: "ptx",         label: "Power-to-X",               weight: 4 },
  { id: "modeling-ai", label: "Modeling & AI",             weight: 4 },
  // --- Major interests (weight 3) ---
  { id: "membrane-r",  label: "Membrane Reactors",         weight: 3 },
  { id: "sofc",        label: "SOFC / rSOC",               weight: 3 },
  { id: "surrogate",   label: "Surrogate Models",           weight: 3 },
  { id: "mpc",         label: "Model Predictive Control",  weight: 3 },
  { id: "phys-ml",     label: "Physics-Consistent ML",     weight: 3 },
  { id: "plant-design",label: "Holistic Plant Design",     weight: 3 },
  // --- Sub-topics (weight 2) ---
  { id: "methanol",    label: "Methanol Synthesis",         weight: 2 },
  { id: "sng",         label: "SNG Production",             weight: 2 },
  { id: "h2-nh3",      label: "Green H₂ / NH₃",            weight: 2 },
  { id: "ft",          label: "Fischer-Tropsch",            weight: 2 },
  { id: "bayesian",    label: "Bayesian Optimization",      weight: 2 },
  { id: "pde",         label: "PDE / ODE Systems",          weight: 2 },
  { id: "membrane-s",  label: "Membrane Separation",        weight: 2 },
  { id: "react-dist",  label: "Reactive Distillation",      weight: 2 },
  { id: "heat-int",    label: "Heat Integration",           weight: 2 },
  { id: "pyrolysis",   label: "Plastic Pyrolysis",          weight: 2 },
  { id: "pytorch",     label: "PyTorch / TensorFlow",       weight: 2 },
  { id: "casadi",      label: "CasADi / IPOPT",             weight: 2 },
  { id: "micro",       label: "Microreactors",              weight: 2 },
  // --- Tools / niche (weight 1) ---
  { id: "modular",     label: "Modular Plants",             weight: 1 },
  { id: "aspen",       label: "Aspen Plus",                 weight: 1 },
  { id: "biomass",     label: "Biomass Gasification",       weight: 1 },
] as const;

type Interest = (typeof INTERESTS)[number];

// Size classes per weight tier
const SIZE: Record<number, { text: string; px: string; py: string }> = {
  4: { text: "text-lg",  px: "px-6", py: "py-3"   },
  3: { text: "text-base",px: "px-5", py: "py-2.5" },
  2: { text: "text-sm",  px: "px-4", py: "py-2"   },
  1: { text: "text-xs",  px: "px-3", py: "py-1.5" },
};

// ─── Individual pill ──────────────────────────────────────────────────────────
interface PillProps {
  interest: Interest;
  index: number;
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}

function InterestPill({ interest, index, hoveredId, onHover, onLeave }: PillProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { id, label, weight } = interest;
  const isHovered = hoveredId === id;
  const displaced = hoveredId !== null && !isHovered;

  // Golden-angle spiral gives each pill a consistent, evenly-spread escape direction
  const angle = (index * 137.508 * Math.PI) / 180;
  const escapeX = Math.cos(angle) * (isMobile ? 8 : 18);
  const escapeY = Math.sin(angle) * (isMobile ? 5 : 11);

  // Spring-driven displacement motion values
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const springX = useSpring(targetX, { stiffness: 20, damping: 15 });
  const springY = useSpring(targetY, { stiffness: 20, damping: 15 });

  // Apply displacement target (setting MotionValue drives the spring automatically)
  targetX.set(displaced ? escapeX : 0);
  targetY.set(displaced ? escapeY : 0);

  // Idle float parameters — varied per pill for organic nebula feel
  const floatAmp    = isMobile ? 2 : 4 + weight * 0.8;
  const floatDur    = 8 + (index % 7) * 0.28;   // 8.0 – 9.9 s
  const floatDelay  = (index * 0.53) % 4;

  const sz = SIZE[weight] ?? SIZE[1];

  return (
    // Outer wrapper carries spring displacement — isolated from the float/drag layer
    <motion.div style={{ x: springX, y: springY }}>
      <motion.div
        layout
        // Idle orbital float — continuous, never grounded
        animate={{ y: [0, -floatAmp, 0] }}
        transition={{
          duration: floatDur,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        // On hover: scale up with heavy-fluid spring
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", stiffness: 20, damping: 15 },
        }}
        // Drag — snaps back with same heavy-fluid spring
        drag
        dragConstraints={{ top: -30, bottom: 30, left: -30, right: 30 }}
        dragElastic={0.35}
        dragTransition={{ bounceStiffness: 20, bounceDamping: 15 }}
        onHoverStart={() => onHover(id)}
        onHoverEnd={onLeave}
        className={`inline-flex items-center rounded-full font-inter font-medium select-none cursor-grab active:cursor-grabbing ${sz.text} ${sz.px} ${sz.py}`}
        style={{
          background: isHovered ? "var(--glow)" : "transparent",
          border: "1px solid var(--border)",
          color: displaced ? "var(--text-muted)" : "var(--primary)",
          boxShadow: isHovered ? "0 0 24px var(--glow-strong)" : "none",
          filter: displaced ? "blur(0.4px)" : "none",
          transition: "color 0.3s, background 0.3s, border-color 0.3s, box-shadow 0.3s, filter 0.3s",
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// ─── Cloud container ──────────────────────────────────────────────────────────
export function InterestsCloud() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="px-6 py-28 max-w-5xl mx-auto">
      <motion.h2
        className="font-grotesk text-3xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span style={{ color: "var(--primary)" }}>Interests</span>
      </motion.h2>

      <motion.p
        className="text-center font-inter text-sm mb-16"
        style={{ color: "var(--text-dim)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Hover to displace · Drag to orbit
      </motion.p>

      {/* LayoutGroup enables smooth relayout when sizes shift */}
      <LayoutGroup id="nebula">
        <div className="flex flex-wrap justify-center gap-3 leading-loose">
          {INTERESTS.map((interest, i) => (
            <InterestPill
              key={interest.id}
              interest={interest}
              index={i}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
