export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 ABHAY CHOUHAN. All rights reserved.</span>

        <div className="flex gap-6">
          <a
            href="https://github.com/adc24"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/abhay-chouhan-563126313"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>

          <a
            href="https://www.instagram.com/abhayy.chouhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
