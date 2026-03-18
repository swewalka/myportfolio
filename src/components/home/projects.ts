export type Project = {
  title: string;
  description: string;
  technologies: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: 'Planner Board',
    description:
      'Weekly planning workspace that helps teams break goals into clear tasks, dependencies, and deadlines.',
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    href: 'https://example.com/planner-board',
  },
  {
    title: 'Build Tracker',
    description:
      'A lightweight dashboard for tracking hardware or software milestones, blockers, and release readiness.',
    technologies: ['Next.js', 'Prisma', 'SQLite'],
    href: 'https://example.com/build-tracker',
  },
  {
    title: 'Automation Bench',
    description:
      'Internal toolset for scripting repetitive QA checks and shipping repeatable engineering workflows.',
    technologies: ['Python', 'FastAPI', 'Docker'],
    href: 'https://example.com/automation-bench',
  },
  {
    title: 'Experiment Log',
    description:
      'Searchable project journal for documenting hypotheses, failed attempts, and practical takeaways.',
    technologies: ['React', 'Node.js', 'OpenSearch'],
    href: 'https://example.com/experiment-log',
  },
];
