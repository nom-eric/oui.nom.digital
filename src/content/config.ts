import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Publication
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),

    // Editorial
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // SEO / Social
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),

    // Auteur / ligne éditoriale
    author: z.string().default("Øui"),
    section: z.string().optional(),
  }),
});

export const collections = {
  articles,
};
