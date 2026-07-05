import { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { TeddyMark } from "./Logo";

export interface Project {
  name: string;
  flagship?: boolean;
  description: string;
  install: string;
  github: string;
  pypi: string;
  badges: string[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    boxShadow: "0 1px 2px rgba(43, 33, 26, 0.06)",
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
  hover: {
    y: -4,
    boxShadow: "0 18px 40px -14px rgba(43, 33, 26, 0.3)",
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — button is a no-op */
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-espresso px-4 py-3">
      <code className="font-mono text-[13px] text-oat sm:text-sm">
        <span className="mr-2 select-none text-camel" aria-hidden="true">
          $
        </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy command: ${command}`}
        className="shrink-0 rounded-md p-1.5 text-oat/70 transition-colors hover:bg-cream/10 hover:text-oat"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      className={`flex flex-col gap-5 rounded-2xl bg-cream p-6 sm:p-8 ${
        project.flagship ? "border-2 border-camel md:col-span-2" : "border border-espresso/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <TeddyMark size={24} />
        <h3 className="font-mono text-xl font-medium text-espresso">{project.name}</h3>
        {project.flagship && (
          <span className="ml-auto rounded-full border border-camel bg-camel/15 px-3 py-1 font-mono text-xs font-medium tracking-widest text-tweed">
            FLAGSHIP
          </span>
        )}
      </div>

      <p
        className={`leading-relaxed text-espresso/75 ${
          project.flagship ? "max-w-3xl text-base sm:text-lg" : "text-base"
        }`}
      >
        {project.description}
      </p>

      <div className={project.flagship ? "max-w-xl" : ""}>
        <InstallCommand command={project.install} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-tweed transition-colors hover:text-espresso"
        >
          GitHub
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          href={project.pypi}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-tweed transition-colors hover:text-espresso"
        >
          PyPI
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <ul className="flex flex-wrap gap-2 sm:ml-auto" aria-label={`${project.name} details`}>
          {project.badges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border border-espresso/15 px-2.5 py-0.5 font-mono text-xs text-espresso/70"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
