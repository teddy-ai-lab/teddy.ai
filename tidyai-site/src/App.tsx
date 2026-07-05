import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Principles from "./components/Principles";

const Benchmarks = lazy(() => import("./components/Benchmarks"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only rounded-lg bg-espresso px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <Principles />
        <Suspense fallback={<div className="min-h-96 bg-espresso" aria-hidden="true" />}>
          <Benchmarks />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </MotionConfig>
  );
}
