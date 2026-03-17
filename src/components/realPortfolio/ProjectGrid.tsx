import ProjectCard from './ProjectCard';
import { projectsData } from './projectsData';

export default function ProjectGrid() {
  return (
    <div className="project-grid">
      {projectsData.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
