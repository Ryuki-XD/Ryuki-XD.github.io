import { Card, CardContent } from "@/components/ui/card";
import { Code2, FileText, Lightbulb } from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "HTML", level: 85, icon: Code2, color: "from-primary to-primary-glow" },
    { name: "CSS", level: 80, icon: Code2, color: "from-primary to-primary-glow" },
    { name: "JavaScript", level: 70, icon: Code2, color: "from-primary to-primary-glow" },
    { name: "Python", level: 65, icon: Code2, color: "from-primary to-primary-glow" },
    { name: "Writing", level: 90, icon: FileText, color: "from-secondary to-accent" },
    { name: "Problem-Solving", level: 85, icon: Lightbulb, color: "from-accent to-secondary" },
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-muted-foreground text-base md:text-lg">
              Continuously learning and improving these core competencies
            </p>
          </div>

          <div className="space-y-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card
                  key={skill.name}
                  className="shadow-card hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-primary">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg md:text-xl font-semibold">
                            {skill.name}
                          </h3>
                          <span className="text-sm font-semibold text-primary">
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      ></div>
                    </div>
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

export default Skills;
