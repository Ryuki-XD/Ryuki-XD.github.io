import { useCallback, useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/hooks/use-typewriter";

const MESSAGE = "Welcome to my ePortfolio";
const SEEN_KEY = "introSeen";

/** Longest the intro may stay up, whatever happens. */
const MAX_INTRO_MS = 3000;

interface WelcomeOverlayProps {
  onDone: () => void;
}

const WelcomeOverlay = ({ onDone }: WelcomeOverlayProps) => {
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);
  const { count, done } = useTypewriter(MESSAGE.length, { tickMs: 50 });

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setLeaving(true);
    window.setTimeout(onDone, 500);
  }, [onDone]);

  /* Leave shortly after the line lands. */
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(finish, 650);
    return () => window.clearTimeout(id);
  }, [done, finish]);

  /* Hard ceiling, so the intro can never strand a visitor. */
  useEffect(() => {
    const id = window.setTimeout(finish, MAX_INTRO_MS);
    return () => window.clearTimeout(id);
  }, [finish]);

  /* Any interaction skips ahead. */
  useEffect(() => {
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    window.addEventListener("wheel", finish, { passive: true });
    return () => {
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("wheel", finish);
    };
  }, [finish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background transition-all duration-500 ${
        leaving ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100 scale-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-xl sm:text-2xl md:text-4xl px-6 text-center">
        <span className="text-primary" aria-hidden="true">
          ${" "}
        </span>
        <span className="text-foreground">{MESSAGE.slice(0, count)}</span>
        <span
          className="inline-block w-[0.6ch] h-[1em] bg-primary align-middle ml-1 animate-pulse"
          aria-hidden="true"
        ></span>
      </p>

      {/* Thin progress line that fills as the greeting types. */}
      <div
        className="h-px w-40 sm:w-56 bg-border overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-all duration-150 ease-linear"
          style={{ width: `${(count / MESSAGE.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export { SEEN_KEY };
export default WelcomeOverlay;
