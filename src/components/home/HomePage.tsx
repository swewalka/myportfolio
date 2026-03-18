import { ContactSection } from './ContactSection';
import { ContextBlock } from './ContextBlock';
import { HomeIntro } from './HomeIntro';
import { ProjectSection } from './ProjectSection';

export function HomePage() {
  return (
    <main className="relative z-10 -mt-[14vh] pb-24 sm:-mt-[18vh] lg:-mt-[22vh]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 sm:px-10 lg:px-14">
        <HomeIntro />
        <ProjectSection />
        <ContextBlock />
        <ContactSection />
      </div>
    </main>
  );
}
