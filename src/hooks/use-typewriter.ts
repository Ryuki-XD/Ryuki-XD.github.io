import { useEffect, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveals `total` characters over time, returning how many are visible so far.
 *
 * Returns `total` immediately when the visitor has asked for reduced motion or
 * while `start` is false, so callers can render the finished text instead.
 */
export const useTypewriter = (
  total: number,
  { start = true, charsPerTick = 1, tickMs = 28 } = {},
) => {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? total : 0));

  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setCount(total);
      return;
    }

    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        const next = c + charsPerTick;
        if (next >= total) {
          window.clearInterval(id);
          return total;
        }
        return next;
      });
    }, tickMs);

    return () => window.clearInterval(id);
  }, [total, start, charsPerTick, tickMs]);

  return { count, done: count >= total };
};
