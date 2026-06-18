import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    archived: z.boolean().optional().default(false),
    layout: z.string().optional(),
    type: z.string().optional(),
  }),
});

export const collections = { blog };
