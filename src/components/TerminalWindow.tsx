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
      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true"></span>
      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true"></span>
      <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true"></span>
      <span className="ml-2 text-[#8b949e] text-xs">{title}</span>
    </div>
    <div className="bg-[#0d1117] text-[#c9d1d9] leading-relaxed">{children}</div>
  </div>
);

export default TerminalWindow;
