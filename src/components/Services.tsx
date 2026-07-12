import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Code, FileEdit } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Web Design",
      description:
        "Creating visually appealing and user-friendly web interfaces with modern design principles and attention to detail.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: Code,
      title: "Front-End Development",
      description:
        "Building responsive and interactive websites using HTML, CSS, and JavaScript with clean, maintainable code.",
      gradient: "from-secondary to-accent",
    },
    {
      icon: FileEdit,
      title: "Content Writing",
      description:
        "Crafting engaging and clear content that effectively communicates ideas and connects with the target audience.",
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Services</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Offering a range of services to help bring your digital ideas to
              life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="shadow-card hover-lift hover-glow transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-foreground/70">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
