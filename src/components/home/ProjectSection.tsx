import { ProjectCard } from './ProjectCard';
import { projects } from './projects';
import { useTheme } from '../themes/themeContext';

export function ProjectSection() {
  const { activeThemeConfig } = useTheme();
  const { colors } = activeThemeConfig.tokens;

  return (
    <section id="projects" className="grid gap-6 scroll-mt-20" aria-labelledby="project-heading">
      <div className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: colors.textSecondary }}>
          Selected Work
        </p>
        <h2 id="project-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: colors.textPrimary }}>
          Projects I care about shipping
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
