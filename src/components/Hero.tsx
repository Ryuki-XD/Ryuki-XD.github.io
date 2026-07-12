import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 md:pt-0 bg-gradient-hero"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <p className="font-mono text-primary text-base md:text-lg">
            Hi, my name is
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Sudip Kr. Gachhadar.
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold !text-muted-foreground leading-tight">
            I build practical software, end to end.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl pt-2">
            Web developer &amp; content writer — always curious, always leveling
            up. I like shipping complete, working products: database-backed web
            apps with AI chatbots, data tools, and desktop software. Currently
            looking for my first professional developer role.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-base md:text-lg px-8 hover-glow"
              onClick={() => scrollToSection("#portfolio")}
            >
              See My Work
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8"
            >
              <a
                href="https://github.com/Ryuki-XD"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-16 lg:mt-24 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => scrollToSection("#about")}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
