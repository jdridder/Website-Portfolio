"use client";

import { FloatingCard } from "@/components/ui/FloatingCard";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE_ITEMS = [
  {
    year: "2016 – 2018",
    title: "Abitur",
    institution: "Bischöfliches St. Josef-Gymnasium Bocholt",
    description:
      "Grade 1.2. Mathematics 15/15 · Chemistry 15/15. GDCh Best Student in Chemistry 2018. 2nd place at regional Jugend Forscht with an electrochemical study on road-salt NaCl concentrations in melt water.",
    tag: "Education",
  },
  {
    year: "2018 – 2019",
    title: "B.Sc. Chemical Engineering (Year 1)",
    institution: "Christian Brothers University · Memphis, Tennessee",
    description:
      "Awarded a track-and-field scholarship as an 800 m runner at age 18. GPA 4.0. Developed native-level English through full immersion — a formative step out of comfort zone.",
    tag: "Athletics & Study",
  },
  {
    year: "2019 – 2023",
    title: "B.Sc. Chemical Engineering",
    institution: "TU Dortmund University",
    description:
      "Average grade 1.5 · Thesis grade 1.0. Thesis: Finite-Element Methods (OCFE & Galerkin) for intra-pellet diffusion and heat transport in silver catalyst pellets — implemented in Python/Gekko/IPOPT. Awarded Best Degree of Academic Year 2023–24 (Wacker Chemie AG Bachelor Award). Deutschlandstipendium scholar (Evonik, 2021–2025).",
    tag: "Education",
  },
  {
    year: "2023 Jan – Apr",
    title: "Data Engineering Intern",
    institution: "Evonik Industries · Marl",
    description:
      "Digital-twin heat pump simulations in Aspen Plus. Built a Python–Aspen API. Performed black-box process optimization via Bayesian optimization. Open-source contribution to the BoFire ML library (polytope sampler for design of experiments). Company-wide final presentation to process engineering staff.",
    tag: "Industry",
  },
  {
    year: "2023 – 2025",
    title: "M.Sc. Chemical Engineering",
    institution: "TU Dortmund University",
    description:
      "Average grade 1.3 · Thesis grade 1.0. Thesis: Physics-Consistent Surrogate Models with Uncertainty Quantification for MPC. Modelled a load-flexible ethylene oxidation reactor (PDEs, CasADi). Trained physics-constrained PyTorch NNs — reduced MPC control effort by 8.5 % and solution time by 21 %. Applied conformalized quantile regression (CQR); zero violations of max-temperature constraint.",
    tag: "Education",
  },
  {
    year: "2024 Feb – Aug",
    title: "Research Assistant",
    institution: "Chair of Reaction Engineering & Catalysis · TU Dortmund",
    description:
      "Macro-kinetics modeling and OCFE diffusion simulation (building on B.Sc. thesis). Bayesian optimization of flow reactor CFD simulations — published as open-source on GitHub. Built a simulation data pipeline. Kinetic parameter fitting for a Berty reactor under GC measurement uncertainty.",
    tag: "Research",
  },
  {
    year: "2024 – present",
    title: "Co-Founder & Director",
    institution: "Wasp Aerodynamics GbR",
    description:
      "Premium running accessories startup. Full-stack e-commerce built with Next.js, React, Stripe, email automation, Google Analytics — self-deployed on Vercel. Product design in Adobe Illustrator and 3D visualisations in Blender. Accountable for business accounting, supplier negotiation, and German tax declaration.",
    tag: "Entrepreneurship",
  },
];

interface TetheredTimelineProps {
  gravityOn: boolean;
}

export function TetheredTimeline({ gravityOn }: TetheredTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring-based progress for the SVG path draw
  const rawProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 18,
    restDelta: 0.001,
  });

  // Map progress to SVG strokeDashoffset: 1000 → 0
  const strokeDashoffset = useTransform(rawProgress, [0, 1], [1000, 0]);

  return (
    <section
      ref={containerRef}
      className="relative px-6 py-32 max-w-5xl mx-auto"
    >
      <motion.h2
        className="font-grotesk text-3xl md:text-5xl font-bold mb-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span style={{ color: "var(--primary)" }}>Tethered</span> Timeline
      </motion.h2>

      <div className="relative flex">
        {/* SVG Vertical connecting path */}
        <div className="absolute left-6 top-0 bottom-0 w-12 hidden md:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
          >
            {/* Background track */}
            <path
              d="M12 0 Q18 250 6 500 Q-6 750 12 1000"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeOpacity="0.25"
              fill="none"
            />
            {/* Animated drawing path */}
            <motion.path
              d="M12 0 Q18 250 6 500 Q-6 750 12 1000"
              stroke="var(--primary)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="1000"
              style={{ strokeDashoffset }}
              className="drop-shadow-[0_0_6px_var(--primary)]"
            />
          </svg>
        </div>

        {/* Timeline items */}
        <div className="flex flex-col gap-10 md:ml-20 w-full">
          {TIMELINE_ITEMS.map((item, i) => (
            <motion.div
              key={item.year + item.title}
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              {/* Node dot */}
              <div
                className="absolute -left-[3.2rem] top-6 hidden md:flex items-center justify-center w-4 h-4 rounded-full border-2 animate-pulse-glow"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--primary)",
                  boxShadow: "0 0 12px var(--primary)",
                }}
              />

              <FloatingCard gravityOn={gravityOn} duration={4 + i * 0.6}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <span
                    className="font-grotesk font-bold text-2xl"
                    style={{ color: "var(--primary)" }}
                  >
                    {item.year}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-inter tracking-widest uppercase"
                    style={{
                      background: "var(--glow)",
                      color: "var(--primary)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-grotesk text-lg font-semibold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="font-inter text-sm text-muted mb-3">
                  {item.institution}
                </p>
                <p className="font-inter text-sm text-primary leading-relaxed">
                  {item.description}
                </p>
              </FloatingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
