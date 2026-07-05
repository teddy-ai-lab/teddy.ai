import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Eyebrow from "./Eyebrow";
import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";

const PROJECTS: Project[] = [
  {
    name: "agentcontext",
    flagship: true,
    description:
      "Document parsing that never loses the plot — or the page number. PDF, DOCX, PPTX, XLSX, HTML → clean Markdown + structured JSON where every block carries provenance: source, page, section path. When your agent cites something, you can prove where it came from.",
    install: "pip install agentcontext-core",
    github: "https://github.com/harish-ai-engineer/agentcontext",
    pypi: "https://pypi.org/project/agentcontext-core/",
    badges: ["Python 3.10+", "Apache-2.0", "zero core deps"],
  },
  {
    name: "diskteddy",
    description:
      "Reclaim the disk space AI development quietly eats — Docker build cache, WSL2 .vhdx bloat, npm/pip caches. Never touches volumes, tagged images, or your data.",
    install: "pipx install disktidy",
    github: "https://github.com/harish-ai-engineer/diskteddy",
    pypi: "https://pypi.org/project/disktidy/",
    badges: ["cross-platform", "MIT"],
  },
  {
    name: "devteddy",
    description:
      "Stale environments and dead artifacts, safely gone — node_modules, virtualenvs, and build outputs found with evidence-based matching. Archive with a manifest and restore later, or delete only when you say so.",
    install: "pipx install devtidy",
    github: "https://github.com/harish-ai-engineer/devteddy",
    pypi: "https://pypi.org/project/devtidy/",
    badges: ["cross-platform", "MIT"],
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Eyebrow label="projects" />
        <h2
          id="projects-heading"
          className="mt-3 font-display text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
        >
          Three tools. Everything in its place.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-espresso/70">
          Each one does a small job precisely, tells you exactly what it found,
          and asks before it touches anything.
        </p>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
