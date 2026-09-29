import { useRef } from "react";
import { navigation } from "@/components/Header/navigation";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import "@/components/Header/Header.css";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const activeId = useSectionNavigation(headerRef);
  return (
    <header className="site-header" ref={headerRef}>
      <a className="brand" href="#top">
        CLÁUDIA MARINHO
      </a>
      <nav aria-label="Main navigation">
        {navigation.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={activeId === id ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
