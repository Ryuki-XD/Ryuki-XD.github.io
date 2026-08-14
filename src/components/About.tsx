import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";

interface Education {
  period: string;
  institution: string;
  /** Awarding body or affiliation, where there is one. */
  affiliation?: string;
  qualification: string;
  /** Only set where the qualification is not yet conferred. */
  status?: string;
  url: string;
}

const education: Education[] = [
  {
    period: "2023 – 2026",
    institution: "ISMT College",
    affiliation: "University of Sunderland, UK",
    qualification: "BSc (Hons) Computer Systems Engineering (IT)",
    status: "Awaiting Graduation",
    url: "https://ismt.edu.np/",
  },
  {
    period: "2021 – 2023",
    institution: "Shikshadeep B.S.S",
    qualification: "+2 Computer Science",
    url: "https://www.shikshadeep.edu.np/",
  },
  {
    period: "2009 – 2021",
    institution: "Lovely Angels English Boarding School",
    qualification: "Secondary Education Examination (SEE)",
    url: "https://school.baburamphuyal.com.np/",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle index="01">About Me</SectionTitle>

          <div className="space-y-14 md:space-y-16 animate-fade-in">
            <div className="space-y-4 text-base md:text-lg text-foreground/75 leading-relaxed max-w-3xl">
              <p>
                I'm a BSc (Hons) Computer Systems Engineering (IT) student at
                ISMT College, studying under the University of Sunderland, UK.
                Most of my time goes into web and application development —
                building things end to end rather than stopping at the
                interface.
              </p>
              <p>
                My work so far comes from academic and personal projects: a
                full-stack business site with an admin dashboard and a REST API,
                two desktop applications built on layered architectures over
                MySQL and SQLite, and a pair of browser games written on Phaser
                 3. Each one taught me a different part of the stack, and all of
                them are open source.
              </p>
              <p>
                I'm currently looking for my first professional developer role,
                where I can keep learning from people who've been doing this
                longer than I have.
              </p>
            </div>

            {/* Education lives inside About but keeps its own anchor so the
                nav link scrolls straight here. */}
            <div id="education" className="scroll-mt-24">
              <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3">
                <GraduationCap
                  className="w-6 h-6 md:w-7 md:h-7 text-primary shrink-0"
                  aria-hidden="true"
                />
                <span>Education</span>
              </h3>

              <ol className="space-y-4">
                {education.map((edu) => (
                  <li key={edu.institution}>
                    <Card className="shadow-card border-border/80 transition-colors duration-300 hover:border-primary/40">
                      <CardContent className="p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                          <span className="inline-flex items-center justify-center shrink-0 px-3 py-1.5 bg-primary/10 text-primary rounded-full font-mono text-xs sm:text-sm whitespace-nowrap sm:w-[124px]">
                            {edu.period}
                          </span>

                          <div className="flex-1 min-w-0 space-y-1.5">
                            <h4 className="text-base md:text-lg font-bold leading-snug">
                              {edu.qualification}
                            </h4>
                            <p className="text-sm md:text-base text-foreground/70">
                              <a
                                href={edu.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-sm hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label={`Visit the ${edu.institution} website (opens in a new tab)`}
                              >
                                {edu.institution}
                              </a>
                              {edu.affiliation && (
                                <>
                                  <span className="text-muted-foreground px-1.5">
                                    ·
                                  </span>
                                  <span className="text-muted-foreground">
                                    {edu.affiliation}
                                  </span>
                                </>
                              )}
                            </p>
                            {edu.status && (
                              <p className="font-mono text-xs text-primary/90 pt-0.5">
                                Status: {edu.status}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
