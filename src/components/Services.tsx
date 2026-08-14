import { Card, CardContent } from "@/components/ui/card";
import { Globe, AppWindow, Server } from "lucide-react";
import SectionTitle from "./SectionTitle";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Responsive websites and web applications built with HTML, CSS, JavaScript, and React.",
    items: ["Responsive websites", "Frontend development", "Web applications"],
  },
  {
    icon: AppWindow,
    title: "Application Development",
    description:
      "Desktop and mobile applications with a clear separation between UI, logic, and data.",
    items: ["Desktop applications", "Mobile applications", "Layered architecture"],
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Server-side logic and data layers, from REST endpoints through to schema design.",
    items: ["REST APIs", "Database integration", "Authentication & CRUD"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle index="03">Services</SectionTitle>
          <p className="-mt-6 mb-10 md:mb-14 text-muted-foreground max-w-2xl leading-relaxed">
            What I can help with, based on what I've actually built.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="h-full shadow-card border-border/80 transition-colors duration-300 hover:border-primary/40"
                >
                  <CardContent className="p-6 md:p-7 h-full flex flex-col gap-4">
                    <div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-lg md:text-xl font-bold">
                      {service.title}
                    </h3>

                    <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-1.5 mt-auto pt-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="font-mono text-xs text-muted-foreground flex items-baseline gap-2"
                        >
                          <span className="text-primary" aria-hidden="true">
                            ▸
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
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
