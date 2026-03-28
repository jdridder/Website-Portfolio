"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BrainCircuit,
  ChartSpline,
  GitBranch,
  Leaf,
  PlugZap,
  ShoppingBag,
  SolarPanel,
  TestTube2,
  Thermometer,
  Trophy,
  ZapIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
    {
    icon: ShoppingBag,
    title: "Wasp Aerodynamics Shop",
    subtitle: "Co-Founder · 2024 – present",
    description: 
      "Premium running apparel startup. Implemented full-stack e-commerce: Next.js frontend, Stripe payments, email automation, database hosting, Google Analytics — entirely self-built and self-deployed on Vercel. Includes 3D product visualizations made in \
        Blender and graphic design in Adobe Illustrator.",
    tags: ["Next.js", "React", "Stripe", "Vercel", "Blender", "Illustrator"],
    accent: "var(--accent)",
  },
  {
    icon: BrainCircuit,
    title: "Physics-Constrained NNs for MPC",
    subtitle: "M.Sc. Thesis · TU Dortmund 2025",
    description:
      "Derivation and implementation of neural networks with uncertainty quantification for model predictive control of a \
       load-flexible packed bed reactor. Physics-constrained PyTorch architecture \
       reduced MPC control effort by 8.5 % and solution time by 21 %. Conformalized quantile regression (CQR) \
       achieved zero violations of the maximum-temperature constraint in this case.",
    tags: ["MPC", "Python", "PyTorch", "CasADi", "do_mpc", "UQ", "IPOPT"],
    accent: "var(--accent)",
  },
  {
    icon: ChartSpline,
    title: "Comparison of finite-element methods",
    subtitle: "B.Sc. Thesis · TU Dortmund 2023",
    description:
      "Implemented orthogonal collocation on finite elements (OCFE) and Galerkin-method in python \
       to solve non-linear ODE systems of 2nd order. \
       Derived a 1D-micro-kinetic model for spherical catalyst particles using mass and enthalpy balance. \
       Analysed impact of numerical errors, simulation duration and accuracy.",
    tags: ["FEM", "Modeling", "Python", "IPOPT", "Gekko", "Micro-kinetics",],
    accent: "var(--accent)",
  },
  {
    icon: GitBranch,
    title: "Bayesian optimization pipeline",
    subtitle: "Research Assistant · TU Dortmund 2024",
    description:
      "Multi-objective black-box optimization of CFD simulations (ANSYS) using \
      Bayesian optimization. Contributed active learning (new acquisition function) for design of experiments \
      focused on pure exploration to the open-source BoFire library. \
      Built a data pipeline communicating between the optimizer and multiple simulation instances \
      for autonomous exploration of the multi-objective output space.",
    tags: ["Python", "BoFire", "Bayesian Opt", "CFD", "GitHub", "Simulation"],
    accent: "var(--accent)",
  },
  {
    icon: TestTube2,
    title: "Kinetic parameter fitting & reactor modeling",
    subtitle: "Research Assistant · TU Dortmund 2024",
    description:
      "Comparison of kinetic parameter uncertainty after fitting the reaction rate expressions \
      vs. fitting a gradientless Berty model to noisy GC measurements. \
      Implementated a Berty model for the ethylene oxidation with additive gaussian noise on GC measurements. \
      Fitted the reaction rate expressions and the complete Berty model to artifial measurements with IPOPT. \
      Comparison of parameter uncertainty.",
    tags: ["Python", "CasADi", "Kinetics", "IPOPT"],
    accent: "var(--accent)",
  },
  {
    icon: Thermometer,
    title: "Optimization of a Digital Twin Heat Pump",
    subtitle: "Intern · Evonik Industries 2023",
    description:
      "Simulated a heat pump digital twin in Aspen Plus. \
      Developed a Python–Aspen API for automated scenario runs. \
      Applied Bayesian optimization for black-box process optimization and contributed \
      the API to the open-source BoFire library. \
      Results presented company-wide to process engineering staff.",
    tags: ["Aspen Plus", "Python", "BoFire", "Bayesian Opt", "Presentation"],
    accent: "var(--accent)",
  },
  {
    icon: Leaf,
    title: "CO₂-Neutral multi-functional plant for wax esters",
    subtitle: "Group Project · BASF, TU Dortmund 2022",
    description:
      "6-week, ~50 h/week group project for BASF (10 students). \
      Full plant design: catalyst identification, mass & energy balancing, heat integration, \
      MATLAB reactor simulation, P&ID with control loops in Visio. \
      Project management using Notion. \
      Weekly presentations and status reports. \
      Final presentation to 100 attendees and a BASF project manager on-site.",
    tags: ["MATLAB", "Excel", "PowerPoint", "Visio", "Notion", "Plant Design",],
    accent: "var(--accent)",
  },
  {
    icon: PlugZap,
    title: "Heat pump power forecast",
    subtitle: "2025",
    description:
      "Modeled heat loss of a private building using wall heat transfer coefficients, recirculation rate \
      and shell surface area. \
      Trained a support vector machine (SVM) model with a heat pump datasheet. \
      Simulated heat and electricity demand across 25 winters to predict the electricity bill.",
    tags: ["Heating", "SVM", "Power Forecast", "Heat Pumps"],
    accent: "var(--accent)",
  },
  {
    icon: ZapIcon,
    title: "World energy demand",
    subtitle: "Data science project – TechLabs 2020",
    description:
      "3-week, group project (4 students). \
      Analysis of world energy demand: \
      Data scraping (governmental websites, ourworldindata), cleaning (Python/pandas/numpy), \
      visualization (Matplotlib/Plotly). \
      Final paper and presentation.",
    tags: ["DataScience", "Global Energy", "Visualization",],
    accent: "var(--accent)",
  },
  {
    icon: Trophy,
    title: "Analysis of NaCl-concentration in melt water",
    subtitle: "2nd place JugendForscht, LK Chemistry 2018",
    description:
      "Took melt water samples on regional roads and rivers. \
      Determined chloride ion concentrations using potentiometry with Ag-electrodes. \
      Critically asessed results, impact on soil and experimental procedure. \
      Developed a research poster and presented at competiton in Marl. \
      Won the 2nd place.",
    tags: ["Lab", "Electrochemistry", "Competition", "Poster", "NaCl"],
    accent: "var(--accent)",
  },
  {
    icon: SolarPanel,
    title: "Power output monitoring of a solar panel",
    subtitle: "2020",
    description:
      "Developed a measurement system for current, voltage and surface temperature of a solar panel using \
      the Arduino Uno microcontroller and according sensors. \
      Built circuit, soldered resistors and implemented controller logic (C) to monitor power output \
      and temperature on LED display.",
    tags: ["Sensors", "Arduino", "DC-circuits"],
    accent: "var(--accent)",
  },
];

interface ProjectGalleryProps {
  gravityOn: boolean;
}

export function ProjectGallery({ gravityOn }: ProjectGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const totalCards = PROJECTS.length;
  const cardWidth = 360;
  const gap = 24;
  const totalTrackWidth = totalCards * cardWidth + (totalCards - 1) * gap + 128;

  useEffect(() => {
    const calc = () => {
      setMaxTranslate(-(totalTrackWidth - window.innerWidth));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [totalTrackWidth]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, maxTranslate]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalCards * 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-bold mb-16 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: "var(--primary)" }}>Project</span> Gallery
        </motion.h2>

        <div className="relative">
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
          />

          <motion.div
            className="flex gap-6 px-16 pt-6 pb-6"
            style={{ x, width: `${totalTrackWidth}px` }}
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
      </div>
    </section>
  );
}
