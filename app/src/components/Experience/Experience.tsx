import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { companies } from "@/components/Experience/experience.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Experience/Experience.css";

export default function Experience() {
  const { t } = useTranslation();
  return (
    <section
      className="experience"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="content">
        <h2 id="experience-heading">
          <span className="word-anchor experience-word">
            {t("experience.title")}
            <Rays className="experience-rays" />
          </span>
        </h2>

        <div className="timeline">
          {companies.map(({ id, nameLines, dates, logo, roles }) => (
            <article className="company" key={id}>
              <div className="company-head">
                <div className="logo-frame">
                  <img src={logo.src} alt={t(logo.alt)} loading="lazy" />
                </div>

                <h3>
                  {nameLines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </h3>

                <p className="company-date">{t(dates)}</p>
              </div>

              <div className="roles">
                {roles.map((role) => (
                  <div className="role" key={role.id}>
                    <div className="role-heading">
                      <h4>{t(role.title)}</h4>
                      <span>{t(role.dates)}</span>
                    </div>

                    <p>{t(role.description)}</p>
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
