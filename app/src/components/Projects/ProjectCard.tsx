import { useTranslation } from "react-i18next";
import type { Project } from "@/components/Projects/projects.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Projects/ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const text = (
    <div className="project-text">
      <h3>
        <span className="word-anchor project-title-word">
          {project.name}
          <Rays className="project-rays" />
        </span>
      </h3>
      <p className="project-subtitle">{t(project.subtitle)}</p>
      <p>{t(project.description)}</p>
    </div>
  );
  const art = (
    <div className="project-art">
      <img src={project.image} alt={t(project.alt)} loading="lazy" />
    </div>
  );
  return (
    <article className={`project project-${project.theme}`}>
      {project.theme === "green" ? (
        <>
          {art}
          {text}
        </>
      ) : (
        <>
          {text}
          {art}
        </>
      )}
    </article>
  );
}
