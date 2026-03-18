import { useTheme } from '../themes/themeContext';

const links = [
  { label: 'Email', href: 'mailto:hello@example.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export function ContactSection() {
  const { activeThemeConfig } = useTheme();
  const { colors, layout } = activeThemeConfig.tokens;

  return (
    <section
      id="contact"
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
        Contact
      </p>
      <h2 className="text-2xl font-semibold tracking-tight" style={{ color: colors.textPrimary }}>
        Want to collaborate or compare notes?
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => {
          const isExternal = link.href.startsWith('http');
          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              className="inline-flex items-center justify-center border px-4 py-2 text-sm font-semibold uppercase tracking-[0.08em] transition-colors"
              style={{
                borderRadius: layout.radius,
                borderWidth: layout.borderWidth,
                borderColor: colors.border,
                color: colors.textPrimary,
                backgroundColor: colors.surfaceHover,
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
