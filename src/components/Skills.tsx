import { Card, CardContent } from "@/components/ui/card";
import SectionTitle from "./SectionTitle";

const Skills = () => {
  const groups = [
    {
      title: "Languages",
      items: ["Python", "Java", "JavaScript", "SQL", "HTML & CSS"],
    },
    {
      title: "Frameworks & Libraries",
      items: ["React", "JavaFX", "Streamlit", "PyMongo", "JDBC"],
    },
    {
      title: "Databases & Tools",
      items: ["MySQL", "MongoDB", "Git & GitHub", "Maven", "VS Code"],
    },
    {
      title: "Concepts",
      items: [
        "REST APIs",
        "MVC / layered design",
        "CRUD & auth",
        "AI integration",
        "Content writing",
      ],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle index="02">Skills</SectionTitle>

          <div className="grid sm:grid-cols-2 gap-6">
            {groups.map((group, index) => (
              <Card
                key={group.title}
                className="shadow-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-xs md:text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
