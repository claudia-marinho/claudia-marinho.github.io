import { useTranslation } from "react-i18next";
import Rays from "@/components/Rays/Rays";
import "@/components/Hero/Hero.css";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero split" aria-labelledby="hero-heading">
      <div className="hero-copy panel">
        <div className="hero-title-group">
          <h1 id="hero-heading">
            <span className="hero-greeting">{t("hero.greeting")}</span>
            <br />
            <span className="word-anchor hero-word">
              CLÁUDIA
              <span className="accent-stroke" aria-hidden="true">
                .
              </span>
              <Rays className="hero-rays" />
            </span>
          </h1>
        </div>
        <div className="hero-role-group">
          <p className="hero-role">{t("hero.role")}</p>
          <svg
            className="scribble hero-scribble"
            viewBox="0 0 110 45"
            aria-hidden="true"
          >
            <path d="M4 26 Q42 3 103 8 M20 39 Q55 18 108 22" />
          </svg>
        </div>
        <p>{t("hero.description")}</p>
        <a className="button" href="#projects">
          {t("hero.cta")} <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="hero-image">
        <img
          src="assets/portrait.jpg"
          alt={t("hero.alt")}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
