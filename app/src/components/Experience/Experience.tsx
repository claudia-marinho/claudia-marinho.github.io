import { Fragment } from "react";
import { companies } from "@/components/Experience/experience.data";
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
          {companies.map(({ id, nameLines, dates, logo, roles }) => (
            <article className="company" key={id}>
              <div className="company-head">
                <div className="logo-frame">
                  <img src={logo.src} alt={logo.alt} loading="lazy" />
                </div>

                <h3>
                  {nameLines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </h3>

                <p className="company-date">{dates}</p>
              </div>

              <div className="roles">
                {roles.map((role) => (
                  <div className="role" key={role.id}>
                    <div className="role-heading">
                      <h4>{role.title}</h4>
                      <span>{role.dates}</span>
                    </div>

                    <p>{role.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
