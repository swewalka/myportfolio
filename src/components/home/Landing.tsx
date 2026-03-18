import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { LandingContent } from './LandingContent';
import { ScrollTransition } from './ScrollTransition';
import { useTheme } from '../themes/themeContext';

export function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cycleTheme } = useTheme();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const viewWork = () => {
    const projectSection = document.getElementById('projects');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={containerRef} className="relative z-20 h-[210vh]" aria-label="Landing section">
      <div className="sticky top-0 h-screen overflow-hidden">
        <ScrollTransition progress={scrollYProgress}>
          <LandingContent onViewWork={viewWork} onCycleTheme={cycleTheme} />
        </ScrollTransition>
      </div>
    </section>
  );
}
