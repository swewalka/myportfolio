import type { Project } from './projectsData';

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>

      <p className="project-card__stack-label">Tech stack:</p>
      <ul className="project-card__tags" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology} className="project-card__tag">
            {technology}
          </li>
        ))}
      </ul>

      <a
        className="project-card__link"
        href={project.href}
        target="_blank"
        rel="noreferrer"
      >
        View Project <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
