import { motion } from 'framer-motion';
import type { Project } from './projects';
import { useTheme } from '../themes/themeContext';

export function ProjectCard({ project }: { project: Project }) {
  const { activeThemeConfig } = useTheme();
  const { colors, layout, motion: motionTokens } = activeThemeConfig.tokens;

  return (
    <motion.article
      whileHover={{ y: -4, scale: motionTokens.hoverScale }}
      whileTap={{ scale: motionTokens.tapScale }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="grid gap-4 border backdrop-blur-sm"
      style={{
        borderRadius: layout.radius,
        borderWidth: layout.borderWidth,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        boxShadow: colors.cardDropShadow,
        padding: '1.4rem',
      }}
    >
      <div className="grid gap-2">
        <h3 className="text-xl font-semibold tracking-tight" style={{ color: colors.textPrimary }}>
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed sm:text-base" style={{ color: colors.textSecondary }}>
          {project.description}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider"
            style={{
              color: colors.textPrimary,
              borderColor: colors.cardRing,
              backgroundColor: colors.surfaceHover,
            }}
          >
            {technology}
          </li>
        ))}
      </ul>

      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold underline underline-offset-4"
        style={{ color: colors.accent }}
      >
        View project <span aria-hidden="true">→</span>
      </a>
    </motion.article>
  );
}
