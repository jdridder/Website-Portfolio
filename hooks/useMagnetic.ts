"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface MagneticOptions {
  radius?: number;   // px radius at which pull activates
  strength?: number; // 0-1 pull intensity
}

export function useMagnetic<T extends HTMLElement>({
  radius = 100,
  strength = 0.4,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const animFrame = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        setIsActive(true);
        cancelAnimationFrame(animFrame.current);
        animFrame.current = requestAnimationFrame(() => {
          const pull = (1 - dist / radius) * strength;
          setPosition({ x: dx * pull, y: dy * pull });
        });
      } else {
        setIsActive(false);
        cancelAnimationFrame(animFrame.current);
        animFrame.current = requestAnimationFrame(() => {
          setPosition({ x: 0, y: 0 });
        });
      }
    },
    [radius, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    cancelAnimationFrame(animFrame.current);
    animFrame.current = requestAnimationFrame(() =>
      setPosition({ x: 0, y: 0 })
    );
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return { ref, position, isActive };
}
