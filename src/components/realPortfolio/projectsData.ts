export type Project = {
  title: string;
  description: string;
  technologies: string[];
  href: string;
};

export const projectsData: Project[] = [
  {
    title: 'EduPlanner Task Board',
    description:
      'Planning interface for weekly study sessions, deadlines, and workload balancing across classes.',
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    href: 'https://example.com/eduplanner-task-board',
  },
  {
    title: 'Workshop Inventory Tracker',
    description:
      'A lightweight tool for tracking parts, materials, and reorder status in a shared maker workspace.',
    technologies: ['Next.js', 'Prisma', 'SQLite'],
    href: 'https://example.com/workshop-inventory-tracker',
  },
  {
    title: 'CAD Export QA Utility',
    description:
      'Automates file validation before manufacturing handoff to reduce errors and missed tolerances.',
    technologies: ['Python', 'FastAPI', 'Docker'],
    href: 'https://example.com/cad-export-qa',
  },
  {
    title: 'Build Notes Archive',
    description:
      'Searchable logbook for project decisions, failures, and fixes to keep teams aligned while shipping.',
    technologies: ['React', 'Node.js', 'ElasticSearch'],
    href: 'https://example.com/build-notes-archive',
  },
];
