import ProjectGrid from './ProjectGrid';
import RealPortfolioHeader from './RealPortfolioHeader';
import './styles.css';

export default function RealPortfolio() {
  return (
    <section className="real-portfolio real-portfolio-workbench relative z-20 w-full min-h-screen">
      <div className="workbench-shell">
        <RealPortfolioHeader />

        <section className="workbench-projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="workbench-section-title">
            Projects
          </h2>
          <ProjectGrid />
        </section>
      </div>
    </section>
  );
}
