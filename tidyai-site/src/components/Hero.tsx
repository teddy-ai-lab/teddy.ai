import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import Terminal from "./Terminal";

const HEADLINE_LINES = [
  ["AI", "development", "is", "messy."],
  ["teddy.ai", "isn't."],
];

const headlineContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const headlineWord: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Ambient background: a few camel specks scattered off-grid drift slowly
 * into alignment on a tidy grid — chaos becoming order. Positions are
 * fixed (not random) so the settled state always looks deliberate.
 */
const SPECKS = [
  { left: "10%", top: "20%", dx: -70, dy: 44, rot: 38, dur: 9, delay: 0 },
  { left: "20%", top: "20%", dx: 52, dy: -30, rot: -24, dur: 11, delay: 0.4 },
  { left: "10%", top: "40%", dx: -34, dy: -58, rot: 15, dur: 10, delay: 0.8 },
  { left: "20%", top: "40%", dx: 80, dy: 36, rot: -40, dur: 12, delay: 0.2 },
  { left: "80%", top: "15%", dx: -60, dy: 64, rot: 28, dur: 10, delay: 0.6 },
  { left: "90%", top: "15%", dx: 44, dy: -42, rot: -18, dur: 9, delay: 1 },
  { left: "80%", top: "70%", dx: -88, dy: -26, rot: 33, dur: 12, delay: 0.3 },
  { left: "90%", top: "70%", dx: 38, dy: 58, rot: -30, dur: 11, delay: 0.7 },
  { left: "50%", top: "85%", dx: -46, dy: -70, rot: 21, dur: 10, delay: 0.5 },
  { left: "60%", top: "85%", dx: 66, dy: 30, rot: -14, dur: 13, delay: 0.9 },
];

function TidyField() {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPECKS.map((s) => (
        <motion.span
          key={`${s.left}-${s.top}`}
          className="absolute h-2.5 w-2.5 rounded-[3px] bg-camel"
          style={{ left: s.left, top: s.top, opacity: 0.07 }}
          initial={reduced ? false : { x: s.dx, y: s.dy, rotate: s.rot }}
          animate={{ x: 0, y: 0, rotate: 0 }}
          transition={{ duration: s.dur, delay: s.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden">
      <TidyField />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-28 lg:pt-24">
        <div>
          <motion.h1
            variants={headlineContainer}
            initial={reduced ? false : "hidden"}
            animate="show"
            className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          >
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((word, wi) => (
                  <span key={`${word}-${wi}`}>
                    <motion.span
                      variants={headlineWord}
                      className={`inline-block ${word === "teddy.ai" ? "font-mono text-tweed" : ""}`}
                    >
                      {word}
                    </motion.span>
                    {wi < line.length - 1 && " "}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            animate="show"
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-espresso/75"
          >
            Clean foundations for agents, pipelines, and the teams that build
            them — a parser whose every output carries provenance, and cleanup
            utilities that never delete before you decide.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            animate="show"
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-tweed px-6 py-3 font-semibold text-cream transition-colors hover:bg-camel hover:text-espresso"
            >
              Explore the tools
              <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a
              href="https://github.com/harish-ai-engineer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-espresso px-6 py-[10px] font-semibold text-espresso transition-colors hover:bg-espresso hover:text-cream"
            >
              <Star size={18} aria-hidden="true" />
              Star on GitHub
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
