"use client";

import { GravityToggle } from "@/components/GravityToggle";
import { HeroSection } from "@/components/sections/HeroSection";
import { InterestsCloud } from "@/components/sections/InterestsCloud";
import { MagneticDock } from "@/components/sections/MagneticDock";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { TetheredTimeline } from "@/components/sections/TetheredTimeline";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { useGravity } from "@/hooks/useGravity";
import { motion } from "framer-motion";

type BentoCell = {
  col: 1 | 2 | 3 | 4;
  row: 1 | 2;
  title: string;
  content: string | string[];
  type: "tags" | "stat" | "text";
  sub?: string;
};

// Skill matrix — populated from Jan-David Ridder's CV
const BENTO_CELLS: BentoCell[] = [
  {
    col: 2 as const,
    row: 1 as const,
    title: "Programming Languages",
    content: ["Python", "MATLAB", "Java", "Swift", "HTML / CSS", "Bash"],
    type: "tags",
  },
  {
    col: 2 as const,
    row: 1 as const,
    title: "Frameworks & Libraries",
    content: ["PyTorch", "TensorFlow", "CasADi", "do_mpc", "NumPy", "BoFire", "React", "Next.js"],
    type: "tags",
  },
  {
    col: 3 as const,
    row: 1 as const,
    title: "Languages",
    content: ["German – native", "English – native-level", "Spanish – basic", "Latin – great Latinum proficiency"],
    type: "tags",
  },
];

export default function Home() {
  const { gravityOn, toggle } = useGravity();

  return (
    <main className="relative">
      {/* Fixed UI chrome */}
      <GravityToggle gravityOn={gravityOn} onToggle={toggle} />
      <MagneticDock />

      {/* Sections */}
      <div id="hero">
        <HeroSection gravityOn={gravityOn} />
      </div>

      {/* Knowledge Nebula — Research Interests */}
      <InterestsCloud />

      {/* Tethered Timeline */}
      <div id="timeline">
        <TetheredTimeline gravityOn={gravityOn} />
      </div>

      {/* Project Gallery */}
      <div id="projects">
        <ProjectGallery gravityOn={gravityOn} />
      </div>

      {/* Bento skills grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <motion.h2
          className="font-grotesk text-3xl md:text-5xl font-bold mb-14 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span style={{ color: "var(--primary)" }}>Skill Matrix</span>
        </motion.h2>

        <BentoGrid>
          {BENTO_CELLS.map((cell, i) => (
            <BentoItem key={cell.title} col={cell.col} row={cell.row}>
              <FloatingCard
                gravityOn={gravityOn}
                duration={3.5 + i * 0.7}
                className="h-full"
              >
                <p
                  className="font-inter text-xs tracking-widest uppercase mb-4"
                  style={{ color: "var(--primary)" }}
                >
                  {cell.title}
                </p>

                {cell.type === "stat" && (
                  <div>
                    <p
                      className="font-grotesk text-5xl font-bold text-glow"
                      style={{ color: "var(--primary)" }}
                    >
                      {cell.content as string}
                    </p>
                    {cell.sub && (
                      <p className="font-inter text-xs text-muted mt-2">
                        {cell.sub}
                      </p>
                    )}
                  </div>
                )}

                {cell.type === "tags" && (
                  <div className="flex flex-wrap gap-2">
                    {(cell.content as string[]).map((tag) => (
                      <span
                        key={tag}
                        className="font-inter text-sm px-3 py-1 rounded-lg"
                        style={{
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--primary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {cell.type === "text" && (
                  <p className="font-inter text-base text-muted leading-relaxed">
                    {cell.content as string}
                  </p>
                )}
              </FloatingCard>
            </BentoItem>
          ))}
        </BentoGrid>
      </section>


      {/* Contact section */}
      <section
        id="contact"
        className="px-6 py-32 max-w-3xl mx-auto text-center pb-48"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-inter text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--primary)" }}
          >
            Open to opportunities
          </p>
          <h2 className="font-grotesk text-4xl md:text-6xl font-bold mb-8 text-primary">
            Let&apos;s build something{" "}
            <span style={{ color: "var(--primary)" }} className="text-glow">
              extraordinary.
            </span>
          </h2>
          <p className="font-inter text-muted mb-12">
            Industry R&amp;D, process engineering, or deep-tech entrepreneurship —
            I bring rigorous modelling, hands-on code, and the discipline of an
            competitive track athlete.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <FloatingCard gravityOn={gravityOn} className="inline-flex">
              <a
                href="mailto:jandavid.ridder@waspaero.de"
                className="font-grotesk text-lg font-semibold tracking-wide flex items-center gap-3"
                style={{ color: "var(--primary)" }}
              >
                <span>◈</span>
                jandavid.ridder@waspaero.de
              </a>
            </FloatingCard>
            <FloatingCard gravityOn={gravityOn} className="inline-flex">
              <a
                href="https://waspaero.de"
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesk text-base font-medium tracking-wide flex items-center gap-3 text-muted"
              >
                <span style={{ color: "var(--primary)" }}>⬡</span>
                waspaero.de
              </a>
            </FloatingCard>
            <FloatingCard gravityOn={gravityOn} className="inline-flex">
              <a
                href="https://www.linkedin.com/in/jan-david-ridder-86035218b/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesk text-base font-medium tracking-wide flex items-center gap-3 text-muted"
              >
                <span style={{ color: "var(--primary)" }}>⬡</span>
                LinkedIn
              </a>
            </FloatingCard>
            <FloatingCard gravityOn={gravityOn} className="inline-flex">
              <a
                href="https://github.com/jdridder"
                target="_blank"
                rel="noopener noreferrer"
                className="font-grotesk text-base font-medium tracking-wide flex items-center gap-3 text-muted"
              >
                <span style={{ color: "var(--primary)" }}>⬡</span>
                GitHub
              </a>
            </FloatingCard>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
