import { Heart, Mail, Github } from "lucide-react";
import { SITE, activeSocials } from "@/config/site";
import { SOCIAL_ICONS } from "./socialIcons";

const Footer = () => {
  const socials = activeSocials();

  return (
    <footer className="py-10 border-t border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-5 text-center">
          <ul className="flex items-center gap-2">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                aria-label={`Email ${SITE.name}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </li>
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.key];
              return (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap text-sm md:text-base">
            <span>Made with</span>
            <Heart
              className="w-4 h-4 text-destructive fill-destructive"
              aria-label="love"
            />
            <span>by {SITE.name}</span>
          </p>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
