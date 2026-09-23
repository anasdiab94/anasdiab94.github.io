// Content collections: one Markdown file per sheet in src/content/cases/, and the
// single how-i-think page. Zod validates shape (required fields, enums, short
// string lengths); word limits on prose are enforced by scripts/check-site.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const short = (max: number) => z.string().min(1).max(max);

const findings = z.object({
  situation: short(400),
  call: short(400),
  built: short(400),
  changed: short(400),
});

const plate = z.object({
  kind: z.enum(['bars', 'dots', 'grid']),
  title: short(80),
  data: z.array(z.array(z.union([z.number(), z.string()]))).min(1),
  callouts: z.array(short(80)).max(3).optional(),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: short(160),
    capability: z.enum(['A', 'B', 'C', 'D', 'E']),
    role: z.enum(['primary', 'secondary']),
    context_generic: short(60),
    period: short(40),
    status: z.enum(['closed', 'ongoing']),
    result: short(80),
    result_kind: z.enum(['number', 'phrase']),
    tools: z.array(short(30)).min(1).max(8),
    findings,
    lesson: short(120).optional(),
    plate: plate.optional(),
    link: z.object({ href: z.url(), label: short(40) }).optional(),
    page: z.boolean(),
    page_path: z.string().startsWith('/').optional(),
    citations: z
      .array(
        z.object({
          title: short(200),
          href: z.url(),
          kind: z.enum(['peer-reviewed', 'institutional report']),
          year: z.number().int(),
        }),
      )
      .optional(),
  }),
});

const howIThink = defineCollection({
  loader: glob({ pattern: 'how-i-think.md', base: './src/content' }),
  schema: z.object({
    title: short(160),
    capability: z.literal('A'),
    context_generic: short(60),
    period: short(40),
    tools: z.array(short(30)).min(1).max(8),
  }),
});

export const collections = { cases, howIThink };
