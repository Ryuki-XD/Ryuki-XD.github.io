import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

interface Skill {
  name: string;
  /** Optional honest qualifier, e.g. skills still being picked up. */
  note?: string;
}

interface SkillGroup {
  title: string;
  items: Skill[];
}

const groups: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "Java" },
      { name: "Python" },
      { name: "JavaScript" },
      { name: "PHP" },
      { name: "SQL" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Phaser 3" },
    ],
  },
  {
    title: "Backend & APIs",
    items: [
      { name: "Node.js" },
      { name: "PHP" },
      { name: "Python (HTTP server)" },
      { name: "REST APIs" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "SQLite" },
      { name: "JDBC" },
      { name: "PyMongo" },
    ],
  },
  {
    title: "Mobile & Cloud",
    items: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "Firebase Auth" },
      { name: "Cloud Firestore" },
      { name: "Kotlin", note: "learning" },
    ],
  },
  {
    title: "Frameworks & Tools",
    items: [
      { name: "JavaFX" },
      { name: "Streamlit" },
      { name: "pandas" },
      { name: "Git & GitHub" },
      { name: "Maven" },
      { name: "VS Code" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle index="02">Skills</SectionTitle>
          <p className="-mt-6 mb-10 md:mb-14 text-muted-foreground max-w-2xl leading-relaxed">
            Technologies I've used across coursework and personal projects.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {groups.map((group, i) => (
              <Reveal key={group.title} delay={i * 70} className="h-full">
              <Card
                className="h-full shadow-card border-border/80 transition-colors duration-300 hover:border-primary/40"
              >
                <CardContent className="p-5 md:p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    {group.title}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="font-mono text-xs md:text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                      >
                        {item.name}
                        {item.note && (
                          <span className="text-primary/60 ml-1.5">
                            · {item.note}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
