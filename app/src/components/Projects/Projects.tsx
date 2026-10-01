import { projects } from "@/components/Projects/projects.data";
import ProjectCard from "@/components/Projects/ProjectCard";
import Rays from "@/components/Rays/Rays";
import "@/components/Projects/Projects.css";

export default function Projects() {
  return (
    <section
      className="selected"
      id="projects"
      aria-labelledby="selected-heading"
    >
      <div className="selected-head content">
        <h2 id="selected-heading">
          SELECTED{" "}
          <span className="word-anchor selected-word">
            WORK
            <Rays className="selected-rays" />
          </span>
        </h2>
        <p>
          <strong>Film education, XR media and school newsrooms.</strong>
          <br />A few projects I’ve worked on, and what I contributed to each.
        </p>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
