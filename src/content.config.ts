import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/articles",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),

    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    silo: z.enum(["identite", "empreinte", "fatigue"]).optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),

    author: z.string().default("Øui"),
    section: z.string().optional(),
    teaser: z.string().optional(),
  }),
});

export const collections = {
  articles,
};