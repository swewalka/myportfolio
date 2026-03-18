import { motion } from 'framer-motion';
import { useTheme } from '../themes/themeContext';

interface LandingContentProps {
  onViewWork: () => void;
  onCycleTheme: () => void;
}

export function LandingContent({ onViewWork, onCycleTheme }: LandingContentProps) {
  const { activeThemeConfig } = useTheme();
  const { colors, layout, typography } = activeThemeConfig.tokens;

  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl items-center px-6 sm:px-10 lg:px-14">
      <div className="grid max-w-4xl gap-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="inline-flex w-fit items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{
            borderRadius: '999px',
            borderWidth: layout.borderWidth,
            borderColor: colors.border,
            color: colors.textSecondary,
            backgroundColor: colors.surface,
          }}
        >
          {activeThemeConfig.label}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          style={{ color: colors.textPrimary, fontFamily: typography.fontFamily }}
        >
          Simon Wewalka
          <span className="mt-2 block text-3xl sm:text-4xl" style={{ color: colors.accent }}>
            {activeThemeConfig.content.landingTagline}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl text-lg leading-relaxed sm:text-xl"
          style={{ color: colors.textSecondary }}
        >
          I like building practical things across software, systems, and experiments. This portfolio
          starts with who I am and continues directly into selected work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={onViewWork}
            className="inline-flex items-center justify-center border px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5"
            style={{
              borderRadius: layout.radius,
              borderWidth: layout.borderWidth,
              borderColor: colors.border,
              color: colors.background,
              backgroundColor: colors.accent,
            }}
          >
            View work
          </button>

          <button
            type="button"
            onClick={onCycleTheme}
            className="inline-flex items-center justify-center border px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] transition-colors"
            style={{
              borderRadius: layout.radius,
              borderWidth: layout.borderWidth,
              borderColor: colors.border,
              color: colors.textPrimary,
              backgroundColor: colors.surface,
            }}
          >
            Change theme
          </button>
        </motion.div>
      </div>
    </div>
  );
}
