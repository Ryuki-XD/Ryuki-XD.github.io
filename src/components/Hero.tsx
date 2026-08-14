import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Mail } from "lucide-react";
import { SITE, CV, activeSocials } from "@/config/site";
import { SOCIAL_ICONS } from "./socialIcons";
import CodeWindow from "./CodeWindow";

const iconButton =
  "inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border text-foreground/70 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

interface HeroProps {
  /** Held false until the welcome intro finishes. */
  startCodeTyping?: boolean;
}

const Hero = ({ startCodeTyping = true }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const socials = activeSocials();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-24 pb-28 md:pt-28 md:pb-32 bg-gradient-hero scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 xl:gap-16 items-center">
          {/* Left column */}
          <div className="min-w-0">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              <p className="font-mono text-primary text-sm md:text-base">
                Hi, I'm
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs md:text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Available for full-time roles
              </span>
            </div>

            <h1
              className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {SITE.name}.
            </h1>

            <p
              className="mt-4 text-lg sm:text-xl md:text-2xl font-bold text-primary leading-snug animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              Software Developer &amp; Web Application Developer
            </p>

            <p
              className="mt-5 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              Computer Systems Engineering student building responsive websites
              and software applications. I like shipping complete, working
              products — database-backed web apps, desktop tools, and browser
              games. Currently looking for my first professional developer role.
            </p>

            <div
              className="mt-8 flex flex-row flex-wrap items-center gap-3 sm:gap-4 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-base px-7 hover-glow"
                onClick={() => scrollToSection("#portfolio")}
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-7"
                onClick={() => scrollToSection("#contact")}
              >
                Contact Me
              </Button>

              {CV.cvUrl && (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="text-base px-5 text-foreground/80 hover:text-primary hover:bg-primary/10"
                >
                  <a href={CV.cvUrl} download={CV.fileName}>
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    Download CV
                  </a>
                </Button>
              )}

              {/* Compact icon links, as in the mockup. */}
              <div className="flex items-center gap-2">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className={iconButton}
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                </a>
                {socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.key];
                  return (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} (opens in a new tab)`}
                      className={iconButton}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  );
                })}
                <a
                  href={`mailto:${SITE.email}`}
                  aria-label={`Email ${SITE.name}`}
                  className={iconButton}
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Right column — hidden below lg, where it would only add height. */}
          <div
            className="hidden lg:block animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CodeWindow start={startCodeTyping} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full animate-bounce"
          onClick={() => scrollToSection("#about")}
          aria-label="Scroll to the About section"
        >
          <ArrowDown className="w-6 h-6 text-primary" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
