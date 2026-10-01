import type { RefObject } from "react";
import { useEffect } from "react";

// Keep the animation targets together so sections can opt in explicitly.
const revealSelector = [
  ".about-copy",
  ".build-intro",
  ".capability",
  ".experience h2",
  ".company",
  ".selected-head",
  ".project-text",
  ".project-art",
  ".footer-copy",
].join(", ");

function resetReveal(element: HTMLElement) {
  element.classList.remove("reveal-in");
  element.style.removeProperty("--reveal-delay");
}

function getRevealDelay(element: HTMLElement) {
  // Let project artwork enter just after its accompanying text.
  if (element.classList.contains("project-art")) return 100;

  // Stagger capability cards in their visual order.
  if (element.classList.contains("capability")) {
    const siblings = Array.from(element.parentElement?.children ?? []);

    return siblings.indexOf(element) * 70;
  }

  return 0;
}

// Animate each target once as it enters the viewport, respecting motion settings.
export function useScrollReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;

    // Content remains visible when observation is unavailable.
    if (!root || !("IntersectionObserver" in window)) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = root.querySelectorAll<HTMLElement>(revealSelector);

    let observer: IntersectionObserver | undefined;

    // Remember completed reveals across changes to the motion preference.
    const revealed = new Set<Element>();

    const stopObserving = () => {
      observer?.disconnect();
      observer = undefined;
    };

    const syncMotionPreference = () => {
      stopObserving();
      targets.forEach(resetReveal);

      // Removing animation styles also stops any reveal currently in progress.
      if (media.matches) return;

      const nextObserver = new IntersectionObserver(
        (entries) => {
          // Disconnected observers may still have queued entries.
          if (observer !== nextObserver) return;

          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            revealed.add(entry.target);
            entry.target.classList.add("reveal-in");
            nextObserver.unobserve(entry.target);
          }
        },
        // Wait until a small portion is visible above the viewport's lower edge.
        { threshold: 0.12, rootMargin: "0px 0px -30px 0px" },
      );

      observer = nextObserver;

      targets.forEach((element) => {
        if (revealed.has(element)) return;

        element.style.setProperty(
          "--reveal-delay",
          `${getRevealDelay(element)}ms`,
        );
        nextObserver.observe(element);
      });
    };

    // Apply the initial preference and keep listening for changes while mounted.
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => {
      // Leave no observer, listener, or animation styles behind on unmount.
      stopObserving();
      media.removeEventListener("change", syncMotionPreference);
      targets.forEach(resetReveal);
    };
  }, [rootRef]);
}
