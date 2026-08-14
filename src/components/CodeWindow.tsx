import TerminalWindow from "./TerminalWindow";
import { useTypewriter } from "@/hooks/use-typewriter";

/* GitHub-dark syntax colours, matching the contact terminal's palette. */
const KW = "text-[#ff7b72]";
const STR = "text-[#a5d6ff]";
const PROP = "text-[#79c0ff]";
const FN = "text-[#d2a8ff]";
const LIT = "text-[#79c0ff]";
const PUNC = "text-[#c9d1d9]";

/**
 * The snippet as coloured tokens. Typing works by revealing characters across
 * this list, so the highlighting survives the animation.
 */
const tokens: [text: string, className: string][] = [
  ["const", KW], [" developer ", PUNC], ["=", KW], [" {\n", PUNC],
  ["  name", PROP], [": ", PUNC], ["'Sudip Kr. Gachhadar'", STR], [",\n", PUNC],
  ["  role", PROP], [": ", PUNC], ["'Software Developer'", STR], [",\n", PUNC],
  ["  degree", PROP], [": ", PUNC], ["'BSc (Hons) Computer Systems Eng.'", STR], [",\n", PUNC],
  ["  university", PROP], [": ", PUNC], ["'Univ. of Sunderland, UK'", STR], [",\n", PUNC],
  ["  status", PROP], [": ", PUNC], ["'Awaiting Graduation'", STR], [",\n", PUNC],
  ["  builds", PROP], [": [", PUNC], ["'web apps'", STR], [", ", PUNC], ["'desktop tools'", STR], ["],\n", PUNC],
  ["};\n\n", PUNC],
  ["const", KW], [" ", PUNC], ["openToWork", FN], [" ", PUNC], ["=", KW], [" () ", PUNC], ["=>", KW], [" ", PUNC], ["true", LIT], [";", PUNC],
];

const TOTAL_CHARS = tokens.reduce((n, [text]) => n + text.length, 0);

/** Tech pills — all drawn from real project work. */
const stack = ["React", "Python", "Java", "MongoDB"];

interface CodeWindowProps {
  /** Typing begins only once the intro has finished. */
  start?: boolean;
}

const CodeWindow = ({ start = true }: CodeWindowProps) => {
  const { count, done } = useTypewriter(TOTAL_CHARS, { start, charsPerTick: 3, tickMs: 16 });

  /* Slice the token list down to the characters revealed so far. */
  let remaining = start ? count : 0;
  const visible: [string, string][] = [];
  for (const [text, className] of tokens) {
    if (remaining <= 0) break;
    visible.push([text.slice(0, remaining), className]);
    remaining -= text.length;
  }

  return (
    <div className="relative" aria-hidden="true">
      {/* Offset panel behind, for depth. */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-border/60 bg-card/40"></div>

      <div className="relative animate-float">
        <TerminalWindow title="developer.js">
          {/* Fixed height stops the card resizing as the text types in. */}
          <div className="p-5 lg:p-6 text-[13px] leading-[1.7] h-[300px] overflow-hidden">
            <pre className="font-mono whitespace-pre-wrap break-words">
              <code>
                {visible.map(([text, className], i) => (
                  <span key={i} className={className}>
                    {text}
                  </span>
                ))}
                <span
                  className={`inline-block w-2 h-4 bg-[#c9d1d9] align-middle ${
                    done ? "animate-pulse" : ""
                  }`}
                ></span>
              </code>
            </pre>
          </div>
        </TerminalWindow>
      </div>

      {/* Floating tech pills, revealed once the code has finished typing. */}
      <ul className="absolute -bottom-5 left-4 right-4 flex flex-wrap gap-2">
        {stack.map((tech, i) => (
          <li
            key={tech}
            className={`rounded-lg border border-primary/30 bg-card/95 backdrop-blur px-3 py-1.5 font-mono text-xs text-primary shadow-card transition-all duration-500 ${
              done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeWindow;
