import { useTheme } from '../themes/themeContext';

export function HomeIntro() {
  const { activeThemeConfig } = useTheme();
  const { colors, layout } = activeThemeConfig.tokens;

  return (
    <section
      className="grid gap-5 border backdrop-blur-sm"
      style={{
        borderRadius: layout.radius,
        borderWidth: layout.borderWidth,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
      }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: colors.textSecondary }}
      >
        About
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: colors.textPrimary }}>
        I build useful products and technical experiments.
      </h2>
      <p className="max-w-3xl text-base leading-relaxed" style={{ color: colors.textSecondary }}>
        I enjoy working at the intersection of engineering and design, where ideas become
        tools people can actually use. This site collects selected projects, process notes,
        and the kind of work I want to keep doing more of.
      </p>
    </section>
  );
}
