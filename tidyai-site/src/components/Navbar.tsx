import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import Logo from "./Logo";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Principles", href: "#principles" },
  { label: "Benchmarks", href: "#benchmarks" },
];

const GITHUB_URL = "https://github.com/harish-ai-engineer";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-oat/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" aria-label="teddy.ai — back to top" className="rounded-md">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-espresso/80 transition-colors hover:text-tweed"
            >
              {link.label}
            </a>
          ))}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-espresso px-4 py-1.5 text-sm font-semibold text-espresso transition-colors hover:bg-espresso hover:text-cream"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-espresso md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden border-t border-espresso/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-espresso/85 hover:bg-cream hover:text-tweed"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center gap-2 rounded-lg border-2 border-espresso px-3 py-2.5 text-base font-semibold text-espresso"
              >
                <GithubIcon size={18} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
