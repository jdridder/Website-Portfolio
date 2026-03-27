"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NAV_ITEMS = [
  { label: "Hero",      icon: "◎", href: "#hero" },
  { label: "Timeline",  icon: "⌖", href: "#timeline" },
  { label: "Projects",  icon: "⬡", href: "#projects" },
  { label: "Contact",   icon: "◈", href: "#contact" },
];

function MagneticDockItem({
  label,
  icon,
  href,
}: {
  label: string;
  icon: string;
  href: string;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { ref, position, isActive } = useMagnetic<HTMLAnchorElement>({
    radius: 100,
    strength: 0.45,
  });

  const springX = useSpring(position.x, { stiffness: 200, damping: 18 });
  const springY = useSpring(position.y, { stiffness: 200, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className="group relative flex flex-col items-center gap-1.5 focus:outline-none"
      style={
        isMobile
          ? {}
          : { x: springX, y: springY }
      }
      whileHover={{ scale: 1.15 }}
      aria-label={label}
    >
      {/* Icon button */}
      <motion.div
        className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-xl transition-colors"
        animate={
          isActive
            ? { boxShadow: "0 0 20px var(--glow), 0 0 40px var(--glow)" }
            : { boxShadow: "none" }
        }
        style={{ color: isActive ? "var(--primary)" : "var(--text-muted)" }}
      >
        {icon}
      </motion.div>

      {/* Label tooltip */}
      <span
        className="font-inter text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: "var(--primary)" }}
      >
        {label}
      </span>
    </motion.a>
  );
}

export function MagneticDock() {
  return (
    <motion.nav
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Site navigation"
    >
      <div
        className="glass flex items-end gap-6 px-8 py-4 rounded-3xl"
        style={{
          boxShadow: "0 0 30px var(--glow), 0 0 1px var(--border)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <MagneticDockItem key={item.href} {...item} />
        ))}
      </div>
    </motion.nav>
  );
}
