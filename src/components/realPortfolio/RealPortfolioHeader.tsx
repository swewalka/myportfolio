const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:hello@example.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
  },
];

export default function RealPortfolioHeader() {
  return (
    <header className="workbench-header">
      <h1 className="workbench-name">Simon Wewalka</h1>
      <p className="workbench-tagline">I like building things.</p>

      <p className="workbench-intro">
        I am a mechanical engineering student building software, hardware, and practical
        experiments. I am also a co-founder of{' '}
        <a href="https://eduplanner-placeholder.com" target="_blank" rel="noreferrer">
          EduPlanner
        </a>
        , a platform focused on improving learning organization.
      </p>

      <nav className="workbench-links" aria-label="Contact and social links">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            className="workbench-link"
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
