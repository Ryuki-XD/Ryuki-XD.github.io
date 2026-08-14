import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

const MESSAGE = "Welcome to the site";
const VOICE_KEY = "voiceEnabled";
const SEEN_KEY = "introSeen";

/** Deep, deliberate delivery — as close to a JARVIS read as the Web Speech API gets. */
const speakWelcome = () => {
  const synth = window.speechSynthesis;
  if (!synth) return;

  const say = () => {
    const utterance = new SpeechSynthesisUtterance(MESSAGE);
    utterance.rate = 0.82;
    utterance.pitch = 0.5;

    const voices = synth.getVoices();
    utterance.voice =
      voices.find((v) => /en-GB/i.test(v.lang) && /daniel|george|arthur|male/i.test(v.name)) ??
      voices.find((v) => /en-GB/i.test(v.lang)) ??
      voices.find((v) => /^en/i.test(v.lang)) ??
      null;

    // Throws in some browsers when speech is blocked before any interaction.
    try {
      synth.speak(utterance);
    } catch {
      /* Autoplay policy blocked it — the visual intro still runs. */
    }
  };

  if (synth.getVoices().length === 0) {
    synth.addEventListener("voiceschanged", say, { once: true });
  } else {
    say();
  }
};

interface WelcomeOverlayProps {
  /** Called once the overlay has finished and unmounted. */
  onDone: () => void;
}

const WelcomeOverlay = ({ onDone }: WelcomeOverlayProps) => {
  const [leaving, setLeaving] = useState(false);
  const [voiceOn, setVoiceOn] = useState(
    () => localStorage.getItem(VOICE_KEY) !== "off",
  );
  const finished = useRef(false);
  const { count, done } = useTypewriter(MESSAGE.length, { tickMs: 55 });

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    window.speechSynthesis?.cancel();
    setLeaving(true);
    window.setTimeout(onDone, 450);
  }, [onDone]);

  /* Speak once, on mount. */
  useEffect(() => {
    if (voiceOn) speakWelcome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Auto-dismiss shortly after the line finishes typing. */
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(finish, 900);
    return () => window.clearTimeout(id);
  }, [done, finish]);

  /* Let anyone skip it immediately. */
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [finish]);

  const toggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !voiceOn;
    setVoiceOn(next);
    localStorage.setItem(VOICE_KEY, next ? "on" : "off");
    if (!next) window.speechSynthesis?.cancel();
    else speakWelcome();
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
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

      <button
        type="button"
        onClick={toggleVoice}
        aria-label={voiceOn ? "Turn welcome voice off" : "Turn welcome voice on"}
        className="absolute bottom-8 right-8 inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {voiceOn ? (
          <Volume2 className="w-5 h-5" aria-hidden="true" />
        ) : (
          <VolumeX className="w-5 h-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export { SEEN_KEY };
export default WelcomeOverlay;
