import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import profileImage from "@/assets/profile-picture.jpg";

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
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in order-2 lg:order-1">
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

            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 italic">
              "Always curious, always leveling up."
            </p>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Currently learning web development and building practical skills
              one step at a time. Passionate about creating meaningful digital
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
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

          <div className="flex-1 flex justify-center order-1 lg:order-2 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src={profileImage}
                alt="Sudip Kr. Gachhadar"
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-glow border-4 border-primary/20"
              />
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
