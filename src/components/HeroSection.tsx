import { AnimatedName } from "./AnimatedName";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-primary/10 blur-[140px]" />
      </div>

      <div className="relative text-center space-y-6 flex flex-col items-center">
        
        {/* Intro */}
        <p
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0s" }}
        >
          Hello, I'm
        </p>

        {/* Name */}
        <div className="flex justify-center items-center">
          <AnimatedName name={"ABHAY\u00A0CHOUHAN"} />
        </div>

        {/* Roles */}
        <p
          className="text-lg sm:text-xl text-muted-foreground font-light animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Full Stack Developer | Data Analyst
        </p>

        {/* Description */}
        <p
          className="text-sm text-muted-foreground max-w-xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          I build modern web applications using frontend, backend, and database technologies, and turn data into meaningful insights.
        </p>

        {/* Buttons (ALL SAME STYLE) */}
        <div
          className="flex flex-wrap gap-4 justify-center pt-6 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          {/* View Work */}
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:scale-105 hover:opacity-90 hover:-translate-y-1"
          >
            View Projects 🚀
          </a>

          {/* Contact */}
          <a
            href="#contact"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:scale-105 hover:opacity-90 hover:-translate-y-1"
          >
            Contact Me
          </a>

          {/* Resume */}
          <a
            href="/Abhay_Chouhan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:scale-105 hover:opacity-90 hover:-translate-y-1"
          >
            Resume 📄
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}