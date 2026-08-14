/**
 * Site-wide configuration.
 *
 * This is the one file to edit when a link, an address, or the CV changes —
 * every component reads from here so nothing is hard-coded twice.
 */

export const SITE = {
  name: "Sudip Kr. Gachhadar",
  role: "Software Developer",
  /** Shown in the terminal card next to `whoami`. */
  shortRole: "software developer",
  url: "https://ryuki-xd.github.io/",
  email: "kaixhero@gmail.com",
  github: "https://github.com/Ryuki-XD",
  githubHandle: "github.com/Ryuki-XD",
} as const;

/**
 * CV / résumé download.
 *
 * TO ENABLE: drop your PDF into `public/cv/` and set `cvUrl` to its path,
 * e.g. "/cv/Sudip_Kr_Gachhadar_CV.pdf".
 * While this is an empty string the Download CV buttons simply do not render,
 * so the site never ships a broken link.
 */
export const CV = {
  cvUrl: "",
  fileName: "Sudip_Kr_Gachhadar_CV.pdf",
} as const;

export type SocialKey =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "telegram";

export interface SocialLink {
  key: SocialKey;
  label: string;
  /** Leave empty to hide this link. Paste the full profile URL to show it. */
  href: string;
}

/**
 * Secondary social links, shown in the hero, contact section, and footer.
 *
 * TO ENABLE: paste the full URL into `href`. Entries with an empty `href` are
 * filtered out and never rendered, so you can add them one at a time.
 *
 * Expected formats:
 *   linkedin  https://www.linkedin.com/in/<your-profile>
 *   instagram https://www.instagram.com/<username>
 *   facebook  https://www.facebook.com/<username>
 *   whatsapp  https://wa.me/<country code><number>   e.g. https://wa.me/97798...
 *             (digits only — no +, spaces, or dashes)
 *   telegram  https://t.me/<username>
 */
export const SOCIALS: SocialLink[] = [
  { key: "linkedin", label: "LinkedIn", href: "" },
  { key: "instagram", label: "Instagram", href: "" },
  { key: "facebook", label: "Facebook", href: "" },
  { key: "whatsapp", label: "WhatsApp", href: "" },
  { key: "telegram", label: "Telegram", href: "" },
];

export const activeSocials = (): SocialLink[] =>
  SOCIALS.filter((social) => social.href.trim().length > 0);
