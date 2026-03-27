"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface ProjectCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent?: string;
}

export function ProjectCard({
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
  accent = "var(--primary)",
}: ProjectCardProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const floatAmplitude = isMobile ? 2 : 6;

  return (
    <motion.div
      className="glass rounded-2xl p-6 relative cursor-pointer h-full"
      // Idle orbital float — viscous, never grounded
      animate={{ y: [0, -floatAmplitude, 0] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        y: -4,
        borderColor: "var(--primary)",
        boxShadow:
          "0 12px 40px var(--glow-strong), 0 0 24px var(--glow), 0 0 48px var(--glow)",
        transition: {
          type: "spring",
          stiffness: 20,
          damping: 15,
        },
      }}
    >
      {/* Accent top-edge line */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full"
        style={{ background: accent, opacity: 0.55 }}
      />

      {/* Lucide icon — top-left, ~32 px, engineering green */}
      <div className="mb-5 mt-2">
        <Icon
          size={32}
          strokeWidth={1.5}
          style={{ color: "var(--primary)" }}
          aria-hidden
        />
      </div>

      <h3 className="font-grotesk text-xl font-bold text-primary mb-1 leading-snug">
        {title}
      </h3>
      <p
        className="font-inter text-xs tracking-widest uppercase mb-4"
        style={{ color: accent }}
      >
        {subtitle}
      </p>
      <p className="font-inter text-sm text-muted leading-relaxed mb-6">
        {description}
      </p>

      {/* Tag cluster */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-inter text-xs px-2 py-0.5 rounded"
            style={{
              background: "var(--glow)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
