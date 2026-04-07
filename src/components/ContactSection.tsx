import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import emailjs from "@emailjs/browser";

export function ContactSection() {
  const revealRef = useScrollReveal();
  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        alert("Message sent successfully ✅");
        formRef.current?.reset(); // Clears the form
      },
      (error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send ❌");
      }
    );
  };

  return (
    <section id="contact" className="py-24 px-6 bg-card/30 relative z-10">
      <div 
        ref={revealRef} 
        className="max-w-lg mx-auto" 
        style={{ opacity: 1 }} // Force visibility for testing
      >
        <h2 className="text-3xl font-bold text-center mb-10">Get In Touch</h2>

        <form ref={formRef} className="space-y-5" onSubmit={sendEmail}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-primary outline-none"
          />

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-primary outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:ring-1 focus:ring-primary outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}