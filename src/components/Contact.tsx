import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Github, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SectionTitle from "./SectionTitle";
import TerminalWindow from "./TerminalWindow";
import { SOCIAL_ICONS } from "./socialIcons";
import { SITE, CV, activeSocials } from "@/config/site";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const CONTACT_EMAIL = SITE.email;
const GITHUB_URL = SITE.github;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const socials = activeSocials();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = contactSchema.parse(formData);
      setIsSubmitting(true);

      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: validated.name,
          email: validated.email,
          message: validated.message,
          _subject: `Portfolio contact from ${validated.name}`,
          _template: "table",
        }),
      });

      if (!res.ok) throw new Error("Delivery failed");

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I'll reply to your email soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Couldn't send the message",
          description: `Something went wrong — please email me directly at ${CONTACT_EMAIL}.`,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle index="05">Get In Touch</SectionTitle>
          <p className="-mt-6 mb-10 md:mb-14 text-muted-foreground max-w-2xl leading-relaxed">
            Have a question or want to work together? Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 animate-fade-in">
              {/* Terminal-style contact card */}
              <TerminalWindow title="contact — bash">
                <div className="p-5 sm:p-6 space-y-3">
                  <p>
                    <span className="text-[#7ee787]">$</span> whoami
                  </p>
                  <p className="pl-5 text-[#e6edf3]">
                    {SITE.name}
                    <span className="text-[#8b949e]"> · {SITE.shortRole}</span>
                  </p>
                  <p>
                    <span className="text-[#7ee787]">$</span> cat contact.txt
                  </p>
                  <p className="pl-5">
                    <span className="text-[#8b949e]">email  → </span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-[#58a6ff] hover:underline break-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="pl-5">
                    <span className="text-[#8b949e]">github → </span>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#58a6ff] hover:underline break-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {SITE.githubHandle}
                    </a>
                  </p>
                  <p>
                    <span className="text-[#7ee787]">$</span>{" "}
                    <span
                      className="inline-block w-2.5 h-4 bg-[#c9d1d9] align-middle animate-pulse"
                      aria-hidden="true"
                    ></span>
                  </p>
                </div>
              </TerminalWindow>

              {/* Primary contact actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                    Email me
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              </div>

              {CV.cvUrl && (
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="w-full text-foreground/80 hover:text-primary hover:bg-primary/10"
                >
                  <a href={CV.cvUrl} download={CV.fileName}>
                    <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                    Download CV
                  </a>
                </Button>
              )}

              {/* Secondary social links — deliberately quieter than the two
                  primary buttons above. Hidden entirely until URLs are set
                  in src/config/site.ts. */}
              {socials.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-mono text-xs text-muted-foreground mr-1">
                    also on
                  </span>
                  {socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.key];
                    return (
                      <a
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} (opens in a new tab)`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <Card className="shadow-card border-border/80 animate-fade-in">
              <CardContent className="p-6 md:p-7">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity hover-glow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
