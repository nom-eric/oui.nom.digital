import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site?: URL }) {
  const site = context.site ?? new URL("https://oui.nom.digital");

  const posts = await getCollection("articles", ({ data }) => {
    // si tu as un champ draft dans ton schema
    return !("draft" in data) || data.draft !== true;
  });

  // tri récent -> ancien (en supposant data.date)
  posts.sort((a, b) => {
    const ad = new Date(a.data.date).getTime();
    const bd = new Date(b.data.date).getTime();
    return bd - ad;
  });

  return rss({
    title: "Øui — Articles",
    description: "Un cadre éditorial pour décider, sans bruit.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/articles/${post.slug}/`,
      categories: [
        ...(post.data.category ? [post.data.category] : []),
        ...(post.data.tags ?? []),
      ],
    })),
  });
}
