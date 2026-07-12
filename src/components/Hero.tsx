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
      className="min-h-screen flex items-center justify-center pt-16 md:pt-0 bg-gradient-hero"
    >
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center">
          <div className="text-center space-y-6 animate-fade-in max-w-3xl">
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg md:text-xl font-medium">
                Hello, I'm
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                Sudip Kr. <span className="text-gradient">Gachhadar</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                Web Developer & Content Writer
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto italic">
              "Always curious, always leveling up."
            </p>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Currently learning web development and building practical skills
              one step at a time. Passionate about creating meaningful digital
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 transition-opacity text-base md:text-lg px-8 hover-glow"
                onClick={() => scrollToSection("#portfolio")}
              >
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base md:text-lg px-8"
                onClick={() => scrollToSection("#contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 lg:mt-20 animate-bounce">
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
