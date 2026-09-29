import { useRef } from "react";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Build from "@/components/Build/Build";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Footer from "@/components/Footer/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollReveal(rootRef);
  return (
    <div ref={rootRef}>
      <Header />
      <main id="top">
        <Hero />
        <About />
        <Build />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
