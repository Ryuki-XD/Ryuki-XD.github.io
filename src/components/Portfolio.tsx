import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import SectionTitle from "./SectionTitle";

const Portfolio = () => {
  const projects = [
    {
      title: "AI Solutions Website",
      description:
        "A full business website with a CMS-style admin dashboard, an AI chatbot powered by Google Gemini, email automation, and a MongoDB-backed REST API served by a Python backend.",
      tags: ["JavaScript", "Python", "MongoDB", "Gemini AI"],
      category: "Full-Stack Web",
      link: "https://github.com/Ryuki-XD/ai-solutions-website",
    },
    {
      title: "AI Resume Analyzer",
      description:
        "An ATS-style resume scorer that analyses a CV against a job description and reports keyword coverage, match score, and improvement suggestions — built with Streamlit.",
      tags: ["Python", "Streamlit", "NLP"],
      category: "AI / Data App",
      link: "https://github.com/Ryuki-XD/ai-resume-analyzer",
    },
    {
      title: "Inventory Management System",
      description:
        "A desktop inventory app with dashboard KPIs and charts, sales and purchase tracking, barcode generation, PDF invoices, Excel/CSV export, and database backups.",
      tags: ["Python", "CustomTkinter", "SQLite", "pandas"],
      category: "Desktop App",
      link: "https://github.com/Ryuki-XD/inventory-management-system",
    },
    {
      title: "Library Management System",
      description:
        "A desktop app for managing books, students, and loans with dashboards and reports. Layered MVC architecture, hashed logins, and light/dark themes over MySQL.",
      tags: ["Java", "JavaFX", "MySQL"],
      category: "Desktop App",
      link: "https://github.com/Ryuki-XD/library-management-system",
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle index="04">Projects</SectionTitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
              <Card
                className="h-full shadow-card hover-lift hover-glow transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {project.category}
                    </Badge>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/70 mb-4">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
