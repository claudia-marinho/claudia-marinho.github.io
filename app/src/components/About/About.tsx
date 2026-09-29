import Rays from "@/components/Rays/Rays";
import "@/components/About/About.css";

export default function About() {
  return (
    <section className="about split" id="about" aria-labelledby="about-heading">
      <div className="about-image">
        <img
          src="assets/about.jpg"
          alt="Cláudia seated on a mountain slope looking towards the Alps"
          loading="lazy"
        />
      </div>
      <div className="about-copy panel">
        <div className="about-title-group">
          <h2 id="about-heading">
            A{" "}
            <span className="word-anchor about-word">
              BIT
              <Rays className="about-rays" />
            </span>
            <br />
            ABOUT ME
          </h2>
        </div>
        <p>
          I’m a software engineer with 7+ years of experience and a strong
          frontend focus. I like building products that feel good to use and
          make sense under the hood, whether that means shaping APIs, crafting
          interfaces, or taking features all the way to production.
        </p>
        <p>
          I care about thoughtful UX, maintainable code, and working with people
          who value clarity, collaboration, and doing things properly.
        </p>
        <p>
          Away from the keyboard, you’ll usually find me thinking about
          mountains, planning a trip to Japan, or listening to metal.
        </p>
      </div>
    </section>
  );
}
