import { useTranslation } from "react-i18next";
import { projects } from "@/components/Projects/projects.data";
import ProjectCard from "@/components/Projects/ProjectCard";
import Rays from "@/components/Rays/Rays";
import "@/components/Projects/Projects.css";

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section
      className="selected"
      id="projects"
      aria-labelledby="selected-heading"
    >
      <div className="selected-head content">
        <h2 id="selected-heading">
          {t("projects.titleStart")}{" "}
          <span className="word-anchor selected-word">
            {t("projects.titleEnd")}
            <Rays className="selected-rays" />
          </span>
        </h2>
        <p>
          <strong>{t("projects.intro")}</strong>
          <br />
          {t("projects.description")}
        </p>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
