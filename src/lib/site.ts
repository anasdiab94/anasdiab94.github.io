// The single object that holds every main-page string. It is not a content
// collection (Astro's file() loader expects a list of entries), so it is
// imported here, validated once with Zod, and read by every component.
import { z } from 'astro/zod';
import raw from '../content/site.json';

const short = (max: number) => z.string().min(1).max(max);

export const siteSchema = z.object({
  naming: z.enum(['named', 'anonymous']),
  identity: z.object({
    name: short(60),
    file_no: short(60),
    cover_line: short(140),
  }),
  ledger: z
    .array(z.object({ value: short(16), label: short(24) }))
    .length(3),
  contact: z.object({
    email: z.email(),
    linkedin: z.url().startsWith('https://www.linkedin.com/in/'),
    pdf: z.string().startsWith('/').endsWith('.pdf'),
  }),
  ui: z.object({
    email_label: short(24),
    linkedin_label: short(24),
    resume_label: short(24),
    skip_link: short(40),
    scroll_cue: short(40),
    stamp_received: short(24),
    motion_label: short(16),
    theme_label: short(16),
  }),
});

export type Site = z.infer<typeof siteSchema>;

export const site: Site = siteSchema.parse(raw);
