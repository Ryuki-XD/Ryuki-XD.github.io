import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Check } from "lucide-react";
import type { Project } from "@/data/projects";

/**
 * Repo / live-demo links shared by both card layouts.
 * Rendered as real, individually focusable links — the card itself is not a
 * link, so keyboard users get one clear target per destination.
 */
const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
    {project.demo && (
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary rounded-sm hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Play ${project.title} in the browser (opens in a new tab)`}
      >
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
        Live demo
      </a>
    )}
    {project.code && (
      <a
        href={project.code}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground rounded-sm hover:text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`View the source code for ${project.title} on GitHub (opens in a new tab)`}
      >
        <Github className="w-4 h-4" aria-hidden="true" />
        Code
      </a>
    )}
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
    {tags.map((tag) => (
      <li key={tag}>
        <Badge
          variant="outline"
          className="font-mono text-xs border-primary/30 text-primary/90 font-normal"
        >
          {tag}
        </Badge>
      </li>
    ))}
  </ul>
);

/**
 * Wide case-study card for the strongest projects: overview, role, and the
 * concrete feature list from the project's own README.
 */
export const FeaturedProjectCard = ({ project }: { project: Project }) => (
  <Card className="shadow-card border-border/80 overflow-hidden">
    <CardContent className="p-6 md:p-8">
      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12">
        <div className="space-y-4 min-w-0">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/10 font-mono text-xs"
          >
            {project.category}
          </Badge>

          <h3 className="text-xl md:text-2xl font-bold leading-snug">
            {project.title}
          </h3>

          <p className="text-foreground/75 leading-relaxed">
            {project.description}
          </p>

          <div className="pt-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
              My role
            </h4>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {project.role}
            </p>
          </div>

          <TagList tags={project.tags} />
          <ProjectLinks project={project} />
        </div>

        {project.highlights && (
          <div className="lg:border-l lg:border-border lg:pl-10 min-w-0">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Key features
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-foreground/75">
                  <Check
                    className="w-4 h-4 text-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

/** Compact, uniform card used for the rest of the grid. */
export const CompactProjectCard = ({ project }: { project: Project }) => (
  <Card className="h-full flex flex-col shadow-card border-border/80 transition-colors duration-300 hover:border-primary/40">
    <CardContent className="p-6 flex flex-col gap-4 h-full">
      <Badge
        variant="secondary"
        className="bg-primary/10 text-primary hover:bg-primary/10 font-mono text-xs w-fit"
      >
        {project.category}
      </Badge>

      <h3 className="text-lg font-bold leading-snug">{project.title}</h3>

      <p className="text-sm text-foreground/70 leading-relaxed flex-1">
        {project.description}
      </p>

      <TagList tags={project.tags} />
      <ProjectLinks project={project} />
    </CardContent>
  </Card>
);
