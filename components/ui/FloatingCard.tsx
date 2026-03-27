"use client";

import { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useGravity } from "@/hooks/useGravity";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  /** Override the random float duration (seconds) */
  duration?: number;
  /** Override the random float amplitude (px) */
  amplitude?: number;
  gravityOn?: boolean;
}

export function FloatingCard({
  children,
  className = "",
  duration,
  amplitude,
  gravityOn = false,
}: FloatingCardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Stable random values per card instance
  const floatDuration = useMemo(
    () => duration ?? 3 + Math.random() * 3,
    [duration]
  );
  const floatAmplitude = useMemo(
    () => amplitude ?? 8 + Math.random() * 6,
    [amplitude]
  );
  const floatDelay = useMemo(() => Math.random() * 2, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    mouseX.set(dx * 0.05);
    mouseY.set(dy * 0.05);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Gravity: drop to bottom of container
  const gravityY = gravityOn ? 200 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`glass rounded-2xl p-6 cursor-pointer relative ${className}`}
      style={{
        willChange: "transform",
        rotateX: isMobile ? 0 : springY,
        rotateY: isMobile ? 0 : springX,
      }}
      // Idle float animation — disabled on mobile for accessibility
      animate={
        isMobile
          ? {}
          : gravityOn
          ? { y: gravityY, transition: { type: "spring", stiffness: 60, damping: 10 } }
          : {
              y: [0, -floatAmplitude, 0],
              transition: {
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
              },
            }
      }
      whileHover={{
        scale: 1.02,
        zIndex: 50,
        boxShadow: "0 0 20px var(--glow), 0 0 40px var(--glow)",
        transition: { duration: 0.2 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Inner glow rim */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(135deg, var(--glow) 0%, transparent 60%)",
        }}
      />
      {children}
    </motion.div>
  );
}
