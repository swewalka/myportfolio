import { useTheme } from '../themes/themeContext';

export function ContextBlock() {
  const { activeThemeConfig } = useTheme();
  const { colors, layout } = activeThemeConfig.tokens;

  return (
    <section
      className="grid gap-4 border backdrop-blur-sm"
      style={{
        borderRadius: layout.radius,
        borderWidth: layout.borderWidth,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        padding: 'clamp(1.4rem, 2.8vw, 2rem)',
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: colors.textSecondary }}>
        Working Style
      </p>
      <p className="max-w-3xl text-base leading-relaxed" style={{ color: colors.textSecondary }}>
        I prefer clear constraints, fast iteration, and straightforward communication. Most of my
        projects start with a practical problem, then evolve through small, testable improvements.
      </p>
    </section>
  );
}
