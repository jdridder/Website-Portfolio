"use client";

import { motion, AnimatePresence } from "framer-motion";

interface GravityToggleProps {
  gravityOn: boolean;
  onToggle: () => void;
}

export function GravityToggle({ gravityOn, onToggle }: GravityToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 glass flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-inter focus:outline-none"
      style={{
        border: gravityOn
          ? "1px solid var(--accent)"
          : "1px solid var(--border)",
        color: gravityOn ? "var(--accent)" : "var(--primary)",
        boxShadow: gravityOn
          ? "0 0 20px var(--glow)"
          : "0 0 0px transparent",
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={gravityOn ? "Disable gravity" : "Enable gravity"}
    >
      {/* Indicator dot */}
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: gravityOn ? "var(--accent)" : "var(--primary)" }}
        animate={
          gravityOn
            ? { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }
            : { scale: 1, opacity: 1 }
        }
        transition={{ repeat: Infinity, duration: 1.2 }}
      />

      <AnimatePresence mode="wait">
        <motion.span
          key={gravityOn ? "on" : "off"}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
        >
          {gravityOn ? "↓ Gravity ON" : "⊕ Global Gravity"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
