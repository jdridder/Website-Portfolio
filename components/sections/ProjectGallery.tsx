"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";
import {
  Brain,
  GitBranch,
  Leaf,
  Thermometer,
  Zap
} from "lucide-react";
import { useRef } from "react";

const PROJECTS = [
  {
    icon: Brain,
    title: "Physics-Constrained NNs for MPC",
    subtitle: "M.Sc. Thesis · TU Dortmund 2025",
    description:
      "Surrogate models with uncertainty quantification for model predictive control of a load-flexible ethylene oxidation reactor. Physics-constrained PyTorch architecture reduced MPC control effort by 8.5 % and solution time by 21 %. Conformalized quantile regression (CQR) achieved zero violations of the maximum-temperature constraint.",
    tags: ["Python", "PyTorch", "CasADi", "do_mpc", "CQR", "IPOPT"],
    accent: "var(--primary)",
  },
  {
    icon: GitBranch,
    title: "Bayesian Optimisation for CFD",
    subtitle: "Research Assistant · TU Dortmund 2024",
    description:
      "Black-box optimisation of flow reactor CFD simulations using Bayesian optimisation. Contributed a polytope sampler for design of experiments to the open-source BoFire library. Built the full simulation data pipeline and fitted kinetic parameters for a Berty reactor under GC measurement uncertainty.",
    tags: ["Python", "BoFire", "Bayesian Opt", "CFD", "GitHub OSS"],
    accent: "var(--primary)",
  },
  {
    icon: Zap,
    title: "Wasp Aerodynamics Shop",
    subtitle: "Co-Founder · 2024 – present",
    description:
      "Premium running accessories startup. Full-stack e-commerce: Next.js frontend, Stripe payments, email automation, database hosting, Google Analytics — entirely self-built and self-deployed on Vercel. Includes 3D product visualisations made in Blender and graphic design in Adobe Illustrator.",
    tags: ["Next.js", "React", "Stripe", "Vercel", "Blender", "Illustrator"],
    accent: "var(--accent)",
  },
  {
    icon: Thermometer,
    title: "Digital Twin Heat Pump",
    subtitle: "Intern · Evonik Industries 2023",
    description:
      "Simulated a heat pump digital twin in Aspen Plus. Developed a Python–Aspen API for automated scenario runs. Applied Bayesian optimisation for black-box process optimisation and contributed the polytope sampler to the open-source BoFire library. Results presented company-wide to process engineering staff.",
    tags: ["Aspen Plus", "Python", "BoFire", "Bayesian Opt"],
    accent: "var(--accent)",
  },
  {
    icon: Leaf,
    title: "CO₂-Neutral Multi-functional Plant for Emollient- and Wax Esters",
    subtitle: "Group Project · BASF, TU Dortmund 2022",
    description:
      "6-week, ~50 h/week group project for BASF (10 students). Full plant design: catalyst identification, mass & energy balancing, heat integration, MATLAB reactor simulation, P&ID with control loops in Visio. Final presentation to 100 attendees and a BASF project manager on-site.",
    tags: ["MATLAB", "Excel", "Visio", "Notion", "Plant Design"],
    accent: "var(--accent)",
  },
];

interface ProjectGalleryProps {
  gravityOn: boolean;
}

export function ProjectGallery({ gravityOn }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 overflow-hidden">
      <motion.h2
        className="font-grotesk text-3xl md:text-5xl font-bold mb-16 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span style={{ color: "var(--primary)" }}>Project</span> Gallery
      </motion.h2>

      {/* Draggable horizontal track */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />

        <motion.div
          ref={trackRef}
          className="flex gap-6 px-16 pb-6 my-50"
          drag={gravityOn ? false : "x"}
          dragConstraints={{
            left: -(PROJECTS.length * 360 - (typeof window !== "undefined" ? window.innerWidth : 1200) + 128),
            right: 0,
          }}
          dragElastic={0.12}
          dragTransition={{ power: 0.3, timeConstant: 220 }}
          whileDrag={{ cursor: "grabbing" }}
          style={{ width: `${PROJECTS.length * 360 + 128}px` }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              style={{ width: 340, flexShrink: 0 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <ProjectCard
                icon={project.icon}
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                tags={project.tags}
                accent={project.accent}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-muted text-xs tracking-widest uppercase mt-4">
        ← Drag to explore →
      </p>
    </section>
  );
}
