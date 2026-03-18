import { Landing } from './Landing';
import { HomePage } from './HomePage';
import { ThemeBackdrop } from './ThemeBackdrop';
import { useTheme } from '../themes/themeContext';

export default function Home() {
  const { activeThemeConfig } = useTheme();

  return (
    <div
      className="relative isolate min-h-screen"
      style={{
        color: activeThemeConfig.tokens.colors.textPrimary,
        fontFamily: activeThemeConfig.tokens.typography.fontFamily,
      }}
    >
      <ThemeBackdrop />
      <div className="relative z-20">
        <Landing />
        <HomePage />
      </div>
    </div>
  );
}
