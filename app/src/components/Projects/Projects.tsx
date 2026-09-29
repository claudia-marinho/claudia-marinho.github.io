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
          <strong>Real products. Real users. Different contexts.</strong>
          <br />
          Here are three projects I’m proud to have helped bring to life.
        </p>
      </div>
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </section>
  );
}
