interface EyebrowProps {
  label: string;
  /** Use camel text on dark (espresso) sections. */
  dark?: boolean;
}

/**
 * The brand-signature section eyebrow, styled as a provenance comment:
 * `<!-- src: teddy.ai | ... -->`
 */
export default function Eyebrow({ label, dark = false }: EyebrowProps) {
  return (
    <p className={`font-mono text-xs sm:text-sm ${dark ? "text-camel" : "text-tweed"}`}>
      {`<!-- src: teddy.ai | ${label} -->`}
    </p>
  );
}
