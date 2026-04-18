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

    // Cartographie (pages piliers)
    // 1 seul silo par article, sinon tu dilues tout.
    silo: z.enum(["identite", "empreinte", "fatigue"]).optional(),

    // Editorial
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    // SEO / Social
    ogImage: z.string().optional(),
    ogImageAlt: z.string().optional(),

    // Auteur / ligne éditoriale
    author: z.string().default("Øui"),
    section: z.string().optional(),

    // Optionnel mais utile (tu l’utilises dans ton md)
    teaser: z.string().optional(),
  }),
});

export const collections = {
  articles,
};
