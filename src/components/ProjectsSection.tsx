import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    title: "AI Stack",
    description:
      "A modern platform to discover, explore, and share AI tools across coding, writing, design, marketing, and productivity. Includes search, categories, ratings, tool submission, and dark mode.",
    tags: ["React", "TypeScript", "Tailwind", "Vite", "FastAPI", "SQLite"],
    link: "https://aistack-project.vercel.app",
  },
  {
    title: "Tax Invoice – Billing Application",
    description:
      "A full-stack SaaS-style billing system for generating GST-compliant invoices with automated calculations, invoice numbering, and A4 printable layout.",
    tags: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    link: "https://tax-invoice-app-production.up.railway.app/",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack online store with real-time inventory, Stripe payments, and admin dashboard.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Task Management App",
    description:
      "Collaborative project management tool with drag-and-drop boards and real-time updates.",
    tags: ["TypeScript", "Next.js", "Supabase"],
  },
  {
    title: "Portfolio Generator",
    description:
      "A CLI tool that scaffolds beautiful portfolio sites from a simple config file.",
    tags: ["Node.js", "Tailwind", "CLI"],
  },
  {
    title: "Weather Dashboard",
    description:
      "Interactive weather visualization with location-based forecasts and animated charts.",
    tags: ["React", "D3.js", "API"],
  },
];

export function ProjectsSection() {
  const ref = useScrollReveal();

  return (
    <section id="projects" className="py-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto opacity-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">
          Projects
        </h2>
        <div className="w-16 h-0.5 gradient-line mx-auto mb-12" />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Card = (
              <div
                key={project.title}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );

            // If link exists → make clickable
            return project.link ? (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <div key={project.title}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}