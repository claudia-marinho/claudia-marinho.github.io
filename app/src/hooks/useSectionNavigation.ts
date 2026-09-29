import type { RefObject } from "react";
import { useEffect, useState } from "react";
import { navigation } from "@/components/Header/navigation";
export function useSectionNavigation(headerRef: RefObject<HTMLElement | null>) {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--sticky-header-height",
        `${height}px`,
      );
      let active: string | null = null;
      for (const { id } of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= height + 3)
          active = id;
      }
      setActiveId(active);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer =
      "ResizeObserver" in window ? new ResizeObserver(schedule) : null;
    observer?.observe(header);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.documentElement.style.removeProperty("--sticky-header-height");
    };
  }, [headerRef]);
  return activeId;
}
