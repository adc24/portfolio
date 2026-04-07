import { useState, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const ref = useScrollReveal();
  const form = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // This functional update ensures smooth typing even during animations
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully ✅");
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error: any) => {
          console.error("ERROR:", error);
          alert("Failed to send ❌. Check Vercel Environment Variables.");
        }
      );
  };

  return (
    <section id="contact" className="py-24 px-6 bg-card/30 relative z-10">
      {/* Removed hardcoded opacity-0 to prevent "stuck" invisible states */}
      <div 
        ref={ref} 
        className="max-w-lg mx-auto will-change-transform"
        style={{ opacity: 0, transition: 'opacity 0.6s ease-out' }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">
          Get In Touch
        </h2>
        <div className="w-16 h-0.5 gradient-line mx-auto mb-4" />
        <p className="text-muted-foreground text-center mb-10 text-sm">
          Have a project in mind? Let's work together.
        </p>

        <form ref={form} className="space-y-5" onSubmit={sendEmail}>
          <div className="relative">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all pointer-events-auto"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all pointer-events-auto"
            />
          </div>

          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none pointer-events-auto"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer active:scale-[0.98]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}