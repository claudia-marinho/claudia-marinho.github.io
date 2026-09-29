import type { RefObject } from "react";
import { useEffect } from "react";
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !rootRef.current) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = rootRef.current.querySelectorAll<HTMLElement>(
      ".about-copy, .build-intro, .capability, .experience h2, .company, .selected-head, .project-text, .project-art, .footer-copy",
    );
    let observer: IntersectionObserver | undefined;
    const configure = () => {
      observer?.disconnect();
      targets.forEach((el) => {
        el.classList.remove("reveal-in");
        el.style.removeProperty("--reveal-delay");
      });
      if (media.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("reveal-in");
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
      );
      targets.forEach((el) => {
        if (el.classList.contains("capability"))
          el.style.setProperty(
            "--reveal-delay",
            `${Array.from(el.parentElement?.children ?? []).indexOf(el) * 70}ms`,
          );
        if (el.classList.contains("project-art"))
          el.style.setProperty("--reveal-delay", "100ms");
        observer?.observe(el);
      });
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      media.removeEventListener("change", configure);
      targets.forEach((el) => {
        el.classList.remove("reveal-in");
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, [rootRef]);
}
