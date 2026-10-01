import Rays from "@/components/Rays/Rays";
import "@/components/Hero/Hero.css";

export default function Hero() {
  return (
    <section className="hero split" aria-labelledby="hero-heading">
      <div className="hero-copy panel">
        <div className="hero-title-group">
          <h1 id="hero-heading">
            <span className="hero-greeting">HI, I’M</span>
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
          <p className="hero-role">
            Frontend-focused full-stack software engineer.
          </p>
          <svg
            className="scribble hero-scribble"
            viewBox="0 0 110 45"
            aria-hidden="true"
          >
            <path d="M4 26 Q42 3 103 8 M20 39 Q55 18 108 22" />
          </svg>
        </div>
        <p>
          I build web applications, with a focus on interfaces that are easy to
          use and the APIs behind them.
        </p>
        <a className="button" href="#projects">
          Explore my work <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="hero-image">
        <img
          src="assets/portrait.jpg"
          alt="Cláudia smiling in the Swiss Alps"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
