import { Github } from "lucide-react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { FeaturedProjectCard, CompactProjectCard } from "./ProjectCard";
import { featuredProjects, otherProjects } from "@/data/projects";
import { SITE } from "@/config/site";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle index="04">Projects</SectionTitle>
          <p className="-mt-6 mb-10 md:mb-14 text-muted-foreground max-w-2xl leading-relaxed">
            Personal and academic projects, each built end to end. Source code
            is public for all of them.
          </p>

          <div className="space-y-6 md:space-y-8">
            {featuredProjects.map((project) => (
              <Reveal key={project.slug}>
                <FeaturedProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
            {otherProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80} className="h-full">
                <CompactProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors rounded-sm px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              More on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
