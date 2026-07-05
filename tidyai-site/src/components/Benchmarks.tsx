import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "./Eyebrow";

const BARS = [
  { label: "text", pct: 94 },
  { label: "structure", pct: 88 },
  { label: "tables", pct: 71, note: "we lose here — for now" },
  { label: "provenance", pct: 100 },
];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

const fillVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Benchmarks() {
  return (
    <section
      id="benchmarks"
      aria-labelledby="benchmarks-heading"
      className="scroll-mt-20 bg-espresso text-cream"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Eyebrow label="benchmarks" dark />
        <h2
          id="benchmarks-heading"
          className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          Benchmarks, even where we lose.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">
          A public golden-corpus benchmark runs agentcontext against MarkItDown
          and Docling in CI on every release — same documents, same scoring, no
          cherry-picking. The numbers get published either way. That&apos;s the
          whole point.
        </p>

        <motion.dl
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 max-w-2xl space-y-6"
        >
          {BARS.map((bar) => (
            <motion.div key={bar.label} variants={rowVariants}>
              <dt className="flex items-baseline justify-between font-mono text-sm">
                <span className="text-cream/85">{bar.label}</span>
                <span className="text-camel">
                  {bar.pct}%
                  {bar.note && <span className="ml-2 text-cream/50">· {bar.note}</span>}
                </span>
              </dt>
              <dd className="mt-2">
                <div
                  role="img"
                  aria-label={`${bar.label}: ${bar.pct} percent`}
                  className="h-3 w-full overflow-hidden rounded-full bg-cream/10"
                >
                  <motion.div
                    variants={fillVariants}
                    className="h-full origin-left rounded-full bg-camel"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
              </dd>
            </motion.div>
          ))}
        </motion.dl>

        <p className="mt-6 max-w-2xl font-mono text-xs text-cream/45">
          {"<!-- placeholder bars · real numbers land with the first CI-published run -->"}
        </p>

        <a
          href="https://github.com/harish-ai-engineer/agentcontext/blob/main/BENCHMARKS.md"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-cream/80 px-5 py-2.5 font-semibold text-cream transition-colors hover:bg-cream hover:text-espresso"
        >
          Read BENCHMARKS.md
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
