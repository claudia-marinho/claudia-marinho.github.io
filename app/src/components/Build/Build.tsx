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
            I enjoy turning ideas into real products—crafting intuitive
            interfaces, building reliable services and helping teams ship with
            confidence.
          </p>
        </div>
        <div className="capabilities">
          <article className="capability">
            <div className="icon icon-blue" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <rect x="3" y="5" width="26" height="22" rx="2" />
                <path d="M3 11h26M13 16l-4 4 4 4m6-8 4 4-4 4" />
              </svg>
            </div>
            <div>
              <h3>Frontend experiences</h3>
              <p>
                Accessible, responsive interfaces that feel clear and intuitive
                to use.
              </p>
              <small>React · Next.js · TypeScript · HTML/CSS</small>
            </div>
          </article>
          <article className="capability">
            <div className="icon icon-lime" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <rect x="3" y="7" width="10" height="7" rx="1" />
                <rect x="19" y="7" width="10" height="7" rx="1" />
                <rect x="11" y="21" width="10" height="7" rx="1" />
                <path d="M8 14v4h8v3m8-7v4h-8" />
              </svg>
            </div>
            <div>
              <h3>APIs &amp; BFFs</h3>
              <p>
                Backend services that connect complex systems to seamless user
                experiences.
              </p>
              <small>Node.js · Express · GraphQL · REST · Python</small>
            </div>
          </article>
          <article className="capability">
            <div className="icon icon-blue" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M16 3v18m-6-6 6 6 6-6M5 23v5h22v-5" />
              </svg>
            </div>
            <div>
              <h3>Delivery</h3>
              <p>
                Taking features from implementation through deployment and
                release.
              </p>
              <small>Docker · Kubernetes · Helm · CI/CD</small>
            </div>
          </article>
          <article className="capability">
            <div className="icon icon-lime" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M6 7h20v15H15l-6 5v-5H6zM11 12h10m-10 5h7" />
              </svg>
            </div>
            <div>
              <h3>Technical guidance</h3>
              <p>
                Reviewing code, sharing knowledge and helping colleagues make
                thoughtful technical decisions.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
