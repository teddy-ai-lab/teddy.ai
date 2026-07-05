import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TeddyMark } from "./Logo";

interface TermLine {
  cmd: string;
  out?: string;
}

const LINES: TermLine[] = [
  { cmd: "pip install agentcontext-core" },
  {
    cmd: "agentcontext parse report.pdf --cite inline",
    out: "report.md · every block carries page + section path",
  },
  {
    cmd: "disktidy report",
    out: "41.2 GB reclaimable · nothing deleted (dry-run)",
  },
  {
    cmd: "devtidy scan ~/Projects --older-than 60d",
    out: "18 stale artifacts · safe to review ✓",
  },
];

const TYPE_MS = 32;
const OUT_DELAY_MS = 420;
const LINE_PAUSE_MS = 1100;
const LOOP_PAUSE_MS = 3500;

function Prompt() {
  return (
    <span className="mr-2 select-none text-camel" aria-hidden="true">
      $
    </span>
  );
}

function OutputLine({ text, animate }: { text: string; animate: boolean }) {
  return (
    <motion.p
      initial={animate ? { opacity: 0, y: 4 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pl-5 text-oat/75"
    >
      <span className="mr-2 text-camel" aria-hidden="true">
        →
      </span>
      {text}
    </motion.p>
  );
}

/**
 * The hero's animated terminal: types each command, fades in its result,
 * and loops. With prefers-reduced-motion, renders the final state
 * statically.
 */
export default function Terminal() {
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outShown, setOutShown] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const line = LINES[lineIdx];
    let t: number;
    if (charIdx < line.cmd.length) {
      t = window.setTimeout(() => setCharIdx((c) => c + 1), TYPE_MS);
    } else if (line.out && !outShown) {
      t = window.setTimeout(() => setOutShown(true), OUT_DELAY_MS);
    } else {
      const isLast = lineIdx === LINES.length - 1;
      t = window.setTimeout(
        () => {
          setLineIdx(isLast ? 0 : lineIdx + 1);
          setCharIdx(0);
          setOutShown(false);
        },
        isLast ? LOOP_PAUSE_MS : LINE_PAUSE_MS,
      );
    }
    return () => window.clearTimeout(t);
  }, [reduced, lineIdx, charIdx, outShown]);

  const showAll = Boolean(reduced);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl bg-espresso shadow-2xl shadow-espresso/40 ring-1 ring-espresso"
      role="img"
      aria-label="Terminal demo: agentcontext parses a PDF with inline citations, disktidy reports 41.2 gigabytes reclaimable without deleting anything, devtidy finds 18 stale artifacts that are safe to review."
    >
      <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3">
        <TeddyMark size={15} light />
        <TeddyMark size={15} light className="opacity-60" />
        <TeddyMark size={15} light className="opacity-30" />
        <span className="ml-3 font-mono text-xs text-oat/40">~/teddy.ai</span>
      </div>

      <div className="min-h-[16.5rem] space-y-1.5 px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        {LINES.map((line, i) => {
          const isDone = showAll || i < lineIdx;
          const isCurrent = !showAll && i === lineIdx;
          if (!isDone && !isCurrent) return null;
          return (
            <div key={line.cmd}>
              <p className="text-oat">
                <Prompt />
                {isDone ? line.cmd : line.cmd.slice(0, charIdx)}
                {isCurrent && (
                  <span
                    className="cursor-block ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-oat"
                    aria-hidden="true"
                  />
                )}
              </p>
              {line.out && (isDone || (isCurrent && outShown)) && (
                <OutputLine text={line.out} animate={!showAll} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
