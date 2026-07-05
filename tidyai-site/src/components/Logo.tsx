import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

/** On hover, Teddy tilts his head and wiggles an ear — then sits neatly still again. */
const headTilt: Variants = {
  hover: {
    rotate: [0, -6, 4, 0],
    transition: { duration: 0.5, ease: "easeInOut", times: [0, 0.35, 0.7, 1] },
  },
};

const earWiggle: Variants = {
  hover: {
    rotate: [0, -22, 14, 0],
    transition: { duration: 0.5, ease: "easeInOut", times: [0, 0.35, 0.7, 1] },
  },
};

interface TeddyMarkProps {
  size?: number;
  /** Use the light treatment on dark (espresso) backgrounds. */
  light?: boolean;
  className?: string;
}

/**
 * Brand mark: Mr. Bean's Teddy — a neat knitted bear head in tweed brown
 * with button eyes. Responds to a parent's `whileHover="hover"` variant.
 */
export function TeddyMark({ size = 28, light = false, className }: TeddyMarkProps) {
  const head = light ? "var(--color-camel)" : "var(--color-tweed)";
  const inner = light ? "var(--color-tweed)" : "var(--color-camel)";
  const muzzle = light ? "var(--color-oat)" : "var(--color-camel)";
  const dark = "var(--color-espresso)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.g
        variants={headTilt}
        style={{ transformBox: "fill-box", transformOrigin: "50% 75%" }}
      >
        <motion.g
          variants={earWiggle}
          style={{ transformBox: "fill-box", transformOrigin: "85% 90%" }}
        >
          <circle cx="7.5" cy="7" r="4.8" fill={head} />
          <circle cx="7.5" cy="7" r="2.3" fill={inner} />
        </motion.g>
        <circle cx="24.5" cy="7" r="4.8" fill={head} />
        <circle cx="24.5" cy="7" r="2.3" fill={inner} />
        <circle cx="16" cy="18" r="11" fill={head} />
        <ellipse cx="16" cy="22" rx="5.6" ry="4.4" fill={muzzle} />
        {/* button eyes, sewn on */}
        <circle cx="11.8" cy="14.5" r="1.5" fill={dark} />
        <circle cx="20.2" cy="14.5" r="1.5" fill={dark} />
        {/* stitched nose + mouth */}
        <path d="M14.4 20.2 h3.2 L16 22.1 Z" fill={dark} />
        <path
          d="M16 22.1 v1.5 M13.9 25.2 q2.1 1.4 4.2 0"
          stroke={dark}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}

interface LogoProps {
  /** Use the light treatment on dark (espresso) backgrounds. */
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <motion.span
      initial={false}
      whileHover="hover"
      className="inline-flex items-center gap-2.5"
    >
      <TeddyMark light={light} />
      <span className="font-mono text-xl font-medium tracking-tight">
        <span className="text-camel">teddy</span>
        {/* dark brown ".ai" flips to cream on espresso backgrounds, where tweed would vanish */}
        <span className={light ? "text-cream" : "text-tweed"}>.ai</span>
      </span>
    </motion.span>
  );
}
