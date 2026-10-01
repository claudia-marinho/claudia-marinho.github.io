import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { navigation } from "@/components/Header/navigation";

// Track the section beneath the sticky header and keep anchor offsets in sync.
export function useSectionNavigation(headerRef: RefObject<HTMLElement | null>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    // Preserve any existing inline value so cleanup can restore it exactly.
    const rootStyle = document.documentElement.style;
    const previousHeight = rootStyle.getPropertyValue("--sticky-header-height");
    const previousPriority = rootStyle.getPropertyPriority(
      "--sticky-header-height",
    );

    // Navigation order follows the section order in App.
    const sections = navigation.map(({ id }) => ({
      id,
      element: document.getElementById(id),
    }));

    let frame: number | null = null;
    let headerHeight = -1;

    const updateNavigation = () => {
      // Release the scheduled frame so subsequent events can request an update.
      frame = null;

      const height = header.getBoundingClientRect().height;

      // CSS uses this value for scroll-padding; write only when the height changes.
      if (height !== headerHeight) {
        headerHeight = height;
        rootStyle.setProperty("--sticky-header-height", `${height}px`);
      }

      // The last section to cross the header is active. The 3px tolerance handles
      // fractional positions when an anchor scroll settles near its target.
      let active: string | null = null;

      for (const { id, element } of sections) {
        if (element && element.getBoundingClientRect().top <= height + 3)
          active = id;
      }

      setActiveId(active);
    };

    // Coalesce scroll, resize, and layout notifications into one update per frame.
    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateNavigation);
    };

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(scheduleUpdate) : null;

    observer?.observe(header);

    // Content and font loading can move section boundaries without a scroll.
    document.querySelectorAll("main > section").forEach((section) => {
      observer?.observe(section);
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    // Initialize immediately, including when the page opens at a section hash.
    updateNavigation();

    // React may mount the target after the browser's initial fragment lookup.
    // Align it once the header offset has been written; later links stay native.
    const initialSection = sections.find(
      ({ id }) => window.location.hash === `#${id}`,
    );
    const anchorFrame = requestAnimationFrame(() => {
      initialSection?.element?.scrollIntoView({ behavior: "instant" });
      scheduleUpdate();
    });

    return () => {
      cancelAnimationFrame(anchorFrame);
      // Cancel pending work before removing listeners and restoring the CSS value.
      if (frame !== null) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (previousHeight)
        rootStyle.setProperty(
          "--sticky-header-height",
          previousHeight,
          previousPriority,
        );
      else rootStyle.removeProperty("--sticky-header-height");
    };
  }, [headerRef]);

  return activeId;
}
