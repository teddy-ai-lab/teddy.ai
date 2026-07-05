# teddy.ai — marketing site

> Clean foundations for building with AI.

Single-page static marketing site for the teddy.ai tools
([agentcontext](https://github.com/harish-ai-engineer/agentcontext),
[diskteddy](https://github.com/harish-ai-engineer/diskteddy),
[devteddy](https://github.com/harish-ai-engineer/devteddy)).

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide icons.
No backend, no CMS, no telemetry — fully static output.

## Development

```bash
npm install
npm run dev        # dev server at http://localhost:5173
```

## Build

```bash
npm run build      # type-checks, then outputs static site to dist/
npm run preview    # serve the production build locally
```

## Deploy

The build output in `dist/` is plain static files — host it anywhere.

### Vercel

Import the repo at vercel.com. Framework preset **Vite** is detected
automatically (build `npm run build`, output `dist`). No config needed.

### Netlify

Import the repo, or drag-and-drop `dist/` at app.netlify.com/drop.

- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages

Pages serves from a subpath (`https://<user>.github.io/<repo>/`), so set
the base path in `vite.config.ts` first:

```ts
export default defineConfig({
  base: "/<repo>/",
  plugins: [react(), tailwindcss()],
});
```

Then publish `dist/` — simplest is the official static-deploy action, or:

```bash
npm run build
npx gh-pages -d dist
```

## Project structure

```
src/
  App.tsx                  # page assembly (Benchmarks + Footer lazy-loaded)
  index.css                # Tailwind v4 theme: palette, fonts, cursor blink
  components/
    Logo.tsx               # <Logo /> + TeddyMark (Mr. Bean's Teddy brand glyph)
    Navbar.tsx             # sticky nav, mobile slide-down menu
    Hero.tsx               # staggered headline, CTAs, ambient "tidying" specks
    Terminal.tsx           # looping typed terminal demo
    Projects.tsx           # projects section data + grid
    ProjectCard.tsx        # card with copy-to-clipboard install command
    Principles.tsx         # "The tidy rules" 2x2 grid
    Benchmarks.tsx         # dark teaser section with animated bars
    Footer.tsx             # links, socials, contact (teddy.ai@outlook.com)
    Eyebrow.tsx            # <!-- src: teddy.ai | ... --> section eyebrow
    BrandIcons.tsx         # inline GitHub / X / Instagram / LinkedIn icons
```

## Smoke tests (optional)

`scripts/smoke.mjs` and `scripts/shots.mjs` drive the running dev server in
headless Edge (via `playwright-core`, no browser download) to check for
console errors and capture section screenshots:

```bash
node scripts/smoke.mjs http://localhost:5173/
```

## Notes

- All animations run through Framer Motion and are gated behind
  `prefers-reduced-motion` (via `MotionConfig reducedMotion="user"` plus
  explicit static fallbacks for the terminal and hero).
- Palette and fonts are defined once in `src/index.css` under `@theme`.
