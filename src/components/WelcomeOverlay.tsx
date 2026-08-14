import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

/** Shown on screen. */
const MESSAGE = "Welcome to my ePortfolio";
/** Spoken aloud — hyphenated so speech engines don't read "ePortfolio" as one odd word. */
const SPOKEN = "Welcome to my e-portfolio";

const VOICE_KEY = "voiceEnabled";
const SEEN_KEY = "introSeen";

/** Longest the intro may stay up, however the speech behaves. */
const MAX_INTRO_MS = 4500;

interface WelcomeOverlayProps {
  onDone: () => void;
}

const WelcomeOverlay = ({ onDone }: WelcomeOverlayProps) => {
  const [leaving, setLeaving] = useState(false);
  const [voiceOn, setVoiceOn] = useState(
    () => localStorage.getItem(VOICE_KEY) !== "off",
  );
  /** True once speech has finished, errored, or been ruled out. */
  const [speechSettled, setSpeechSettled] = useState(false);
  /** Set when the browser refused to speak without a user gesture. */
  const [blocked, setBlocked] = useState(false);

  const finished = useRef(false);
  const started = useRef(false);
  const { count, done: typingDone } = useTypewriter(MESSAGE.length, {
    tickMs: 55,
  });

  /** Deep, deliberate delivery — as close to a JARVIS read as the Web Speech API gets. */
  const speak = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setSpeechSettled(true);
      return;
    }

    const run = () => {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(SPOKEN);
      utterance.rate = 0.82;
      utterance.pitch = 0.5;

      /* Prefer a deep male English voice; Windows ships David and Mark,
         British systems tend to have Daniel or George. */
      const voices = synth.getVoices();
      const male = /daniel|george|arthur|david|mark|alex|male/i;
      utterance.voice =
        voices.find((v) => /en-GB/i.test(v.lang) && male.test(v.name)) ??
        voices.find((v) => /^en/i.test(v.lang) && male.test(v.name)) ??
        voices.find((v) => /en-GB/i.test(v.lang)) ??
        voices.find((v) => /^en/i.test(v.lang)) ??
        null;

      utterance.onstart = () => {
        started.current = true;
        setBlocked(false);
      };
      utterance.onend = () => setSpeechSettled(true);
      utterance.onerror = () => {
        setBlocked(true);
        setSpeechSettled(true);
      };

      try {
        synth.speak(utterance);
      } catch {
        setBlocked(true);
        setSpeechSettled(true);
      }

      /* Autoplay policy blocks speech until the visitor interacts. If nothing
         has started shortly after asking, stop waiting on it. */
      window.setTimeout(() => {
        if (!started.current) {
          setBlocked(true);
          setSpeechSettled(true);
        }
      }, 900);
    };

    if (synth.getVoices().length === 0) {
      synth.addEventListener("voiceschanged", run, { once: true });
      window.setTimeout(run, 250);
    } else {
      run();
    }
  }, []);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    window.speechSynthesis?.cancel();
    setLeaving(true);
    window.setTimeout(onDone, 450);
  }, [onDone]);

  /* Kick the voice off at the same moment the line starts typing. */
  useEffect(() => {
    if (voiceOn) speak();
    else setSpeechSettled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Leave only once the line is typed AND the voice has had its say. */
  useEffect(() => {
    if (!typingDone || !speechSettled) return;
    const id = window.setTimeout(finish, 600);
    return () => window.clearTimeout(id);
  }, [typingDone, speechSettled, finish]);

  /* Hard ceiling, so a stalled voice can never strand the visitor. */
  useEffect(() => {
    const id = window.setTimeout(finish, MAX_INTRO_MS);
    return () => window.clearTimeout(id);
  }, [finish]);

  /* Any interaction skips ahead — except taps on the overlay's own controls. */
  useEffect(() => {
    const skip = (e: Event) => {
      const target = e.target as Element | null;
      if (target?.closest?.("[data-overlay-control]")) return;
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [finish]);

  const toggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    localStorage.setItem(VOICE_KEY, next ? "on" : "off");
    if (next) {
      /* This click is the gesture browsers were waiting for. */
      setSpeechSettled(false);
      started.current = false;
      speak();
    } else {
      window.speechSynthesis?.cancel();
      setSpeechSettled(true);
    }
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
        data-overlay-control
        onClick={toggleVoice}
        aria-label={
          voiceOn
            ? blocked
              ? "Play the welcome voice"
              : "Turn welcome voice off"
            : "Turn welcome voice on"
        }
        className="absolute bottom-8 right-8 inline-flex items-center gap-2 rounded-lg border border-border px-3 h-11 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {voiceOn ? (
          <Volume2 className="w-5 h-5" aria-hidden="true" />
        ) : (
          <VolumeX className="w-5 h-5" aria-hidden="true" />
        )}
        {/* Browsers stay silent until the visitor interacts, so offer the tap. */}
        {voiceOn && blocked && <span className="text-xs">Tap for sound</span>}
      </button>
    </div>
  );
};

export { SEEN_KEY };
export default WelcomeOverlay;
