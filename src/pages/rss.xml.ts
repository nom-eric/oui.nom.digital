import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site?: URL }) {
  const site = context.site ?? new URL("https://oui.nom.digital");

  const posts = await getCollection("articles", ({ data }) => {
    return !("draft" in data) || data.draft !== true;
  });

  const getTime = (p: any) => {
    const d = p.data.date ?? p.data.pubDate;
    return d ? new Date(d).getTime() : 0;
  };

  posts.sort((a, b) => getTime(b) - getTime(a));

  return rss({
    title: "Øui — Textes",
    description: "Un cadre éditorial pour décider, sans bruit.",
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date ?? post.data.pubDate,
      link: `/textes/${post.slug}/`,
      categories: [
        ...(post.data.category ? [post.data.category] : []),
        ...(post.data.tags ?? []),
      ],
    })),
  });
}
