import TerminalWindow from "./TerminalWindow";

/* GitHub-dark syntax colours, matching the contact terminal's palette. */
const kw = "text-[#ff7b72]"; // keywords
const str = "text-[#a5d6ff]"; // strings
const prop = "text-[#79c0ff]"; // object keys
const fn = "text-[#d2a8ff]"; // functions
const punc = "text-[#c9d1d9]"; // punctuation

/** Tech pills that float over the window — all drawn from real project work. */
const stack = ["React", "Python", "Java", "MongoDB"];

/**
 * Decorative code card for the hero's right column. Everything it prints is
 * already stated elsewhere on the page, so it is hidden from screen readers.
 */
const CodeWindow = () => (
  <div className="relative" aria-hidden="true">
    {/* Offset panel behind, for depth. */}
    <div
      className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-border/60 bg-card/40"
      aria-hidden="true"
    ></div>

    <div className="relative animate-float">
      <TerminalWindow title="developer.js">
        <div className="p-5 lg:p-6 text-[13px] leading-[1.7] overflow-x-auto">
          <pre className="font-mono">
            <code>
              <span className={kw}>const</span>{" "}
              <span className={punc}>developer</span>{" "}
              <span className={kw}>=</span> <span className={punc}>{"{"}</span>
              {"\n"}
              {"  "}
              <span className={prop}>name</span>
              <span className={punc}>: </span>
              <span className={str}>'Sudip Kr. Gachhadar'</span>
              <span className={punc}>,</span>
              {"\n"}
              {"  "}
              <span className={prop}>role</span>
              <span className={punc}>: </span>
              <span className={str}>'Software Developer'</span>
              <span className={punc}>,</span>
              {"\n"}
              {"  "}
              <span className={prop}>degree</span>
              <span className={punc}>: </span>
              <span className={str}>'BSc (Hons) Computer Systems Eng.'</span>
              <span className={punc}>,</span>
              {"\n"}
              {"  "}
              <span className={prop}>university</span>
              <span className={punc}>: </span>
              <span className={str}>'Univ. of Sunderland, UK'</span>
              <span className={punc}>,</span>
              {"\n"}
              {"  "}
              <span className={prop}>status</span>
              <span className={punc}>: </span>
              <span className={str}>'Awaiting Graduation'</span>
              <span className={punc}>,</span>
              {"\n"}
              {"  "}
              <span className={prop}>builds</span>
              <span className={punc}>: [</span>
              <span className={str}>'web apps'</span>
              <span className={punc}>, </span>
              <span className={str}>'desktop tools'</span>
              <span className={punc}>],</span>
              {"\n"}
              <span className={punc}>{"}"}</span>
              <span className={punc}>;</span>
              {"\n\n"}
              <span className={kw}>const</span>{" "}
              <span className={fn}>openToWork</span>{" "}
              <span className={kw}>=</span> <span className={punc}>() </span>
              <span className={kw}>{"=>"}</span>{" "}
              <span className="text-[#79c0ff]">true</span>
              <span className={punc}>;</span>
              {"\n"}
              <span className="inline-block w-2 h-4 bg-[#c9d1d9] align-middle animate-pulse"></span>
            </code>
          </pre>
        </div>
      </TerminalWindow>
    </div>

    {/* Floating tech pills overlapping the window's lower edge. */}
    <ul className="absolute -bottom-5 left-4 right-4 flex flex-wrap gap-2">
      {stack.map((tech, i) => (
        <li
          key={tech}
          className="animate-fade-up rounded-lg border border-primary/30 bg-card/95 backdrop-blur px-3 py-1.5 font-mono text-xs text-primary shadow-card"
          style={{ animationDelay: `${0.5 + i * 0.12}s` }}
        >
          {tech}
        </li>
      ))}
    </ul>
  </div>
);

export default CodeWindow;
