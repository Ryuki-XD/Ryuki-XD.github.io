import {
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SocialKey } from "@/config/site";

/**
 * Icon for each social platform, shared by the hero, contact section, and
 * footer so a new platform only has to be mapped once.
 *
 * lucide-react has no WhatsApp glyph, so MessageCircle stands in for it.
 */
export const SOCIAL_ICONS: Record<SocialKey, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
  telegram: Send,
};
