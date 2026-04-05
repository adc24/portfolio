import { useScrollReveal } from "../hooks/useScrollReveal";

const skillCategories = [
  {
    title: "💻 Frontend",
    skills: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "⚙️ Backend",
    skills: ["Node.js", "Flask", "FastAPI"],
  },
  {
    title: "🗄️ Databases",
    skills: ["MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "🧠 Programming Languages",
    skills: ["Python", "JavaScript", "C"],
  },
  {
    title: "📊 Data Analytics",
    skills: ["NumPy", "Pandas", "Matplotlib", "Excel", "Power BI", "Tableau"],
  },
  {
    title: "🎨 Design",
    skills: ["UI/UX Design"],
  },
  {
    title: "📦 Tools & Platforms",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "Render", "Railway"],
  },
  {
    title: "🤖 AI & Tools",
    skills: ["Generative AI", "Prompt Engineering", "AI Tools"],
  },
];

export function SkillsSection() {
  const ref = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6 bg-card/30">
      <div ref={ref} className="max-w-6xl mx-auto opacity-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">
          Skills
        </h2>
        <div className="w-16 h-0.5 gradient-line mx-auto mb-12" />

        {/* Grid layout */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}