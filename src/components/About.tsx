import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";

const About = () => {
  const education = [
    {
      period: "2023 Oct – 2026 Oct",
      institution: "ISMT College Biratnagar",
      description: "Bachelor's degree in technology — course completed, awaiting graduation",
      url: "https://ismt.edu.np/",
    },
    {
      period: "2021 – 2023",
      institution: "Shikshadeep B.S.S",
      description: "+2 Computer Science",
      url: "https://www.shikshadeep.edu.np/",
    },
    {
      period: "2009 – 2021",
      institution: "Lovely Angels English Boarding School",
      description: "Secondary Education Examination (SEE)",
      url: "https://school.baburamphuyal.com.np/",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle index="01">About Me</SectionTitle>

          <div className="space-y-8 animate-fade-in">
            <Card className="shadow-card hover-lift">
              <CardContent className="pt-6">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Currently learning web development and building up my real-life
                  skills one step at a time. I love picking up practical
                  knowledge, improving myself, and exploring things that help me
                  grow in the long run. My journey is driven by curiosity and a
                  genuine passion for creating meaningful digital experiences.
                </p>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-primary" />
                <span>Education</span>
              </h3>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <a
                    key={index}
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${edu.institution} website`}
                    className="block"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                  <Card className="shadow-card hover-lift transition-all duration-300 cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary transition-colors">
                            <GraduationCap className="w-5 h-5" />
                          </span>
                          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-lg font-semibold text-sm">
                            {edu.period}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg md:text-xl font-bold mb-2">
                            {edu.institution}
                          </h4>
                          <p className="text-muted-foreground">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
