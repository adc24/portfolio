import { useEffect, useState } from "react";

interface AnimatedNameProps {
  name: string;
  delay?: number;
}

export function AnimatedName({ name, delay = 0.07 }: AnimatedNameProps) {
  const [showCursor, setShowCursor] = useState(false);
  const letters = name.split("");
  const totalDuration = letters.length * delay;

  useEffect(() => {
    const timer = setTimeout(() => setShowCursor(true), totalDuration * 1000 + 400);
    return () => clearTimeout(timer);
  }, [totalDuration]);

  return (
    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-foreground glow flex items-baseline justify-center">
      {letters.map((letter, i) => (
        <span
          key={i}
          className="animate-letter-reveal inline-block"
          style={{ animationDelay: `${i * delay}s` }}
        >
          {letter}
        </span>
      ))}
      {showCursor && (
        <span className="animate-cursor-blink text-primary ml-1 font-light">|</span>
      )}
    </h1>
  );
}
