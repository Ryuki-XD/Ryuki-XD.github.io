import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github } from "lucide-react";
import { SITE, CV } from "@/config/site";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 md:pt-20 bg-gradient-hero scroll-mt-20"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl space-y-5 md:space-y-6 animate-fade-in">
          <p className="font-mono text-primary text-sm md:text-base">
            Hi, my name is
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            {SITE.name}.
          </h1>

          <p className="text-xl md:text-3xl lg:text-4xl font-bold text-muted-foreground leading-tight">
            Software Developer{" "}
            <span className="text-primary/60 font-normal px-1">|</span> Web &amp;
            App Development
          </p>

          <p className="text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed pt-2">
            Computer Systems Engineering student building responsive websites
            and software applications. I like shipping complete, working
            products — database-backed web apps, desktop tools, and browser
            games. Currently looking for my first professional developer role.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-base px-8 hover-glow"
              onClick={() => scrollToSection("#portfolio")}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base px-8"
              onClick={() => scrollToSection("#contact")}
            >
              Contact Me
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-base px-6 text-foreground/80 hover:text-primary hover:bg-primary/10"
            >
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View my GitHub profile (opens in a new tab)"
              >
                <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                GitHub ↗
              </a>
            </Button>
            {CV.cvUrl && (
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-base px-6 text-foreground/80 hover:text-primary hover:bg-primary/10"
              >
                <a href={CV.cvUrl} download={CV.fileName}>
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download CV
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-16 lg:mt-24">
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
      </div>
    </section>
  );
};

export default Hero;
