import { capabilities } from "@/components/Build/build.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Build/Build.css";

export default function Build() {
  return (
    <section className="build" id="build" aria-labelledby="build-heading">
      <div className="build-inner">
        <div className="build-intro">
          <div className="build-title-group">
            <h2 id="build-heading">
              <span className="word-anchor build-word">
                WHAT
                <Rays className="build-rays" />
              </span>
              <br />I BUILD
            </h2>
          </div>
          <p>
            Most of my work centres on React and TypeScript, but I also work on
            backend services, deployments and technical coordination.
          </p>
        </div>

        <div className="capabilities">
          {/* Card content and SVG geometry are defined together in build.data.ts. */}
          {capabilities.map(
            ({ id, title, description, technologies, icon }) => (
              <article className="capability" key={id}>
                <div className={`icon icon-${icon.colour}`} aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    {icon.rectangles?.map((rectangle, index) => (
                      <rect key={index} {...rectangle} />
                    ))}

                    {icon.paths.map((path) => (
                      <path key={path} d={path} />
                    ))}
                  </svg>
                </div>

                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  {technologies && <small>{technologies}</small>}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
