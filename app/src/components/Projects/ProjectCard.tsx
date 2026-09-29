import type { Project } from "@/components/Projects/projects.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Projects/ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  const text = (
    <div className="project-text">
      <h3>
        <span className="word-anchor project-title-word">
          {project.name}
          <Rays className="project-rays" />
        </span>
      </h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p>{project.description}</p>
    </div>
  );
  const art = (
    <div className="project-art">
      <img src={project.image} alt={project.alt} loading="lazy" />
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
