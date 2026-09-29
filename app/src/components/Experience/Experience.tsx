import Rays from "@/components/Rays/Rays";
import "@/components/Experience/Experience.css";

export default function Experience() {
  return (
    <section
      className="experience"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="content">
        <h2 id="experience-heading">
          <span className="word-anchor experience-word">
            EXPERIENCE
            <Rays className="experience-rays" />
          </span>
        </h2>
        <div className="timeline">
          <article className="company">
            <div className="company-head">
              <div className="logo-frame">
                <img src="assets/evs-logo.png" alt="EVS logo" loading="lazy" />
              </div>
              <h3>
                EVS Broadcast
                <br />
                Equipment
              </h3>
              <p className="company-date">November 2024–present</p>
            </div>
            <div className="roles">
              <div className="role">
                <div className="role-heading">
                  <h4>Software Engineer III</h4>
                  <span>April 2026–present</span>
                </div>
                <p>
                  Building interfaces and Backend-for-Frontend services for
                  professional broadcast products with React, TypeScript and
                  GraphQL.
                </p>
              </div>
              <div className="role">
                <div className="role-heading">
                  <h4>Software Engineer II</h4>
                  <span>November 2024–March 2026</span>
                </div>
                <p>
                  Worked across XR and sustainable streaming projects, from
                  frontend features and backend integrations to Kubernetes
                  deployments.
                </p>
              </div>
            </div>
          </article>
          <article className="company">
            <div className="company-head">
              <div className="logo-frame">
                <img
                  src="assets/mog-logo.jpg"
                  alt="MOG Technologies logo"
                  loading="lazy"
                />
              </div>
              <h3>MOG Technologies</h3>
              <p className="company-date">January 2019–October 2024</p>
            </div>
            <div className="roles">
              <div className="role">
                <div className="role-heading">
                  <h4>Software Engineer &amp; Technical Project Manager</h4>
                  <span>October 2021–October 2024</span>
                </div>
                <p>
                  Built media, education and streaming platforms while
                  contributing to technical direction, project coordination and
                  mentoring.
                </p>
              </div>
              <div className="role">
                <div className="role-heading">
                  <h4>
                    Software Engineer &amp; Junior Technical Project Manager
                  </h4>
                  <span>January 2020–September 2021</span>
                </div>
                <p>
                  Developed web platforms, dashboards and digital marketplaces
                  across European research projects.
                </p>
              </div>
              <div className="role">
                <div className="role-heading">
                  <h4>Junior Software Engineer</h4>
                  <span>2019</span>
                </div>
                <p>
                  Built a real-time messaging platform for my Master’s thesis,
                  later integrated into research projects.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
