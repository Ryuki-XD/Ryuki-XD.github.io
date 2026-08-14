import { ReactNode } from "react";

interface TerminalWindowProps {
  /** Text shown in the title bar, e.g. "contact — bash". */
  title: string;
  className?: string;
  children: ReactNode;
}

/**
 * Shared terminal chrome (traffic lights + title bar) used by the hero and
 * the contact section, so the two windows stay visually identical.
 */
const TerminalWindow = ({ title, className = "", children }: TerminalWindowProps) => (
  <div
    className={`rounded-xl overflow-hidden border border-border shadow-card font-mono text-sm ${className}`}
  >
    <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
      {/* Staggered glow, so the lights cycle red - yellow - green. */}
      {/* text-* matches bg-* so the box-shadow glow (currentColor) is the
          same hue as the dot. */}
      <span
        className="w-3 h-3 rounded-full bg-[#ff5f56] text-[#ff5f56] animate-light"
        style={{ animationDelay: "0s" }}
        aria-hidden="true"
      ></span>
      <span
        className="w-3 h-3 rounded-full bg-[#ffbd2e] text-[#ffbd2e] animate-light"
        style={{ animationDelay: "0.6s" }}
        aria-hidden="true"
      ></span>
      <span
        className="w-3 h-3 rounded-full bg-[#27c93f] text-[#27c93f] animate-light"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      ></span>
      <span className="ml-2 text-[#8b949e] text-xs">{title}</span>
    </div>
    <div className="bg-[#0d1117] text-[#c9d1d9] leading-relaxed">{children}</div>
  </div>
);

export default TerminalWindow;
