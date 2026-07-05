import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Eyebrow from "./Eyebrow";

const RULES = [
  {
    number: "01",
    title: "Dry-run by default",
    body: "Looking is free. Anything destructive requires an explicit flag.",
  },
  {
    number: "02",
    title: "Provenance is not optional",
    body: "Output without a source location is a bug. Unknowns are explicit null, never omitted.",
  },
  {
    number: "03",
    title: "No telemetry, no surprises",
    body: "No network calls, no tracking, no heavyweight deps. pip install and go.",
  },
  {
    number: "04",
    title: "Honest benchmarks",
    body: "Measured in CI, published publicly — including where we lose. Trust is the product.",
  },
];

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 20 },
  },
};

/** The number "stamps" in: slightly oversized and rotated, settling flat. */
const stampVariants: Variants = {
  hidden: { opacity: 0, scale: 1.3, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 17 },
  },
};

export default function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <Eyebrow label="principles" />
        <h2
          id="principles-heading"
          className="mt-3 font-display text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl"
        >
          The tidy rules
        </h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-6 sm:grid-cols-2"
        >
          {RULES.map((rule) => (
            <motion.div
              key={rule.number}
              variants={cardVariants}
              className="rounded-2xl border border-espresso/10 bg-cream p-7 sm:p-8"
            >
              <motion.span
                variants={stampVariants}
                className="inline-block font-mono text-5xl font-medium text-camel"
                aria-hidden="true"
              >
                {rule.number}
              </motion.span>
              <h3 className="mt-4 font-display text-xl font-semibold text-espresso">
                <span className="sr-only">{rule.number}. </span>
                {rule.title}
              </h3>
              <p className="mt-2 leading-relaxed text-espresso/70">{rule.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
