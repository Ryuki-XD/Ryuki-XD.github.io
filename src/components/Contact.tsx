import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import SectionTitle from "./SectionTitle";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const CONTACT_EMAIL = "kaixhero@gmail.com";
const GITHUB_URL = "https://github.com/Ryuki-XD";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle index="05">Get In Touch</SectionTitle>
          <p className="-mt-6 mb-10 text-muted-foreground text-base md:text-lg animate-fade-in">
            Have a question or want to work together? Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-6 animate-fade-in">
              {/* Terminal-style contact card */}
              <div className="rounded-xl overflow-hidden border border-border shadow-card font-mono text-sm">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                  <span className="ml-2 text-[#8b949e] text-xs">contact — bash</span>
                </div>
                <div className="bg-[#0d1117] p-6 space-y-3 text-[#c9d1d9] leading-relaxed">
                  <p>
                    <span className="text-[#7ee787]">$</span> whoami
                  </p>
                  <p className="pl-5 text-[#e6edf3]">
                    Sudip Kr. Gachhadar<span className="text-[#8b949e]"> · web developer</span>
                  </p>
                  <p>
                    <span className="text-[#7ee787]">$</span> cat contact.txt
                  </p>
                  <p className="pl-5">
                    <span className="text-[#8b949e]">email  → </span>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-[#58a6ff] hover:underline break-all"
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
                      className="text-[#58a6ff] hover:underline break-all"
                    >
                      github.com/Ryuki-XD
                    </a>
                  </p>
                  <p>
                    <span className="text-[#7ee787]">$</span>{" "}
                    <span className="inline-block w-2.5 h-4 bg-[#c9d1d9] align-middle animate-pulse"></span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <Mail className="w-4 h-4 mr-2" />
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
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            <Card className="shadow-card animate-fade-in">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
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
                        <Send className="w-4 h-4 ml-2" />
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
