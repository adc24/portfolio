import { useScrollReveal } from "../hooks/useScrollReveal";

export function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6">
      <div ref={ref} className="max-w-4xl mx-auto opacity-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">About Me</h2>
        <div className="w-16 h-0.5 gradient-line mx-auto mb-12" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a passionate developer and aspiring data analyst who loves building beautiful, performant web experiences and uncovering insights from data. With a keen eye for design and a strong interest in analytics, I create digital products and data-driven solutions that make a difference.
            </p>
            <p>
              When I'm not coding, I enjoy diving into datasets, uncovering patterns, and creating visual stories through data. I believe in combining thoughtful design with data-driven insights to build impactful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
             { value: "Student", label: "Developer Status" },
             { value: "12+", label: "Projects Completed" },
             { value: "Open", label: "To Opportunities" },
             { value: "100%", label: "Commitment" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-xl p-5 text-center hover:border-primary/30 transition-colors duration-300"
              >
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
