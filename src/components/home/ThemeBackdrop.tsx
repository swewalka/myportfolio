import { AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/themeContext';

export function ThemeBackdrop() {
  const { activeThemeConfig, activeThemeModule } = useTheme();
  const ActiveTransitionLayer = activeThemeModule.TransitionLayer;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: activeThemeConfig.tokens.colors.background }}
      />
      <AnimatePresence mode="wait">
        <ActiveTransitionLayer key={activeThemeConfig.id} isPerformanceReduced={false} />
      </AnimatePresence>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 75% at 50% -10%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)',
        }}
      />
    </div>
  );
}
