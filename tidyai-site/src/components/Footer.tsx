import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "./BrandIcons";
import Logo from "./Logo";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/teddy-ai-lab",
    Icon: GithubIcon,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/teddyXai",
    Icon: XIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adteddy.ai/",
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/teddyai",
    Icon: LinkedinIcon,
  },
];

const FOOTER_LINKS = [
  { label: "agentcontext", href: "https://github.com/harish-ai-engineer/agentcontext" },
  { label: "diskteddy", href: "https://github.com/harish-ai-engineer/diskteddy" },
  { label: "devteddy", href: "https://github.com/harish-ai-engineer/devteddy" },
  { label: "GitHub profile", href: "https://github.com/teddy-ai-lab" },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">
          <div>
            <a href="#top" aria-label="teddy.ai — back to top" className="inline-block rounded-md">
              <Logo light />
            </a>
            <p className="mt-4 text-sm text-cream/60">Built by Harish.</p>
            <a
              href="mailto:teddy.ai@outlook.com"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-cream/75 transition-colors hover:text-camel"
            >
              <Mail size={15} aria-hidden="true" />
              teddy.ai@outlook.com
            </a>
            <ul className="mt-5 flex items-center gap-2" aria-label="Social links">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-lg border border-cream/15 p-2.5 text-cream/70 transition-colors hover:border-camel hover:text-camel"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-1 sm:text-right">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-cream/75 transition-colors hover:text-camel"
                  >
                    {link.label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-cream/10 pt-6 text-center font-mono text-xs text-camel">
          {"<!-- src: teddy.ai | © 2026 · no telemetry, ever -->"}
        </p>
      </div>
    </footer>
  );
}
