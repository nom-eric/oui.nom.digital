import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

async function toXmlString(out: any): Promise<string> {
  if (typeof out === "string") return out;

  // Promise (si jamais ça passe encore ici)
  if (out && typeof out.then === "function") {
    return await toXmlString(await out);
  }

  // Response (ou Response-like)
  if (out && typeof out.text === "function") {
    return await out.text();
  }

  // { body: string }
  if (out && typeof out.body === "string") return out.body;

  throw new Error(
    `@astrojs/rss: type de retour inattendu (${Object.prototype.toString.call(out)})`
  );
}

export async function GET(context: { site?: URL }) {
  const site = context.site ?? new URL("https://oui.nom.digital");

  const posts = await getCollection("articles", ({ data }) => !data.draft);

  const getTime = (p: any) => {
    const d = p.data.date ?? p.data.pubDate;
    return d ? new Date(d).getTime() : 0;
  };

  posts.sort((a, b) => getTime(b) - getTime(a));

  // IMPORTANT: on await, parce que rss() peut renvoyer un Promise selon version
  const out = await rss({
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

  const xml = await toXmlString(out);

  const stylesheetPI = `<?xml-stylesheet type="text/xsl" href="/rss.xsl"?>\n`;
  const xmlDeclMatch = xml.match(/^<\?xml[^>]*\?>\s*/);

  const patched = xmlDeclMatch
    ? xml.replace(xmlDeclMatch[0], `${xmlDeclMatch[0]}${stylesheetPI}`)
    : `<?xml version="1.0" encoding="UTF-8"?>\n${stylesheetPI}${xml}`;

  return new Response(patched, {
    status: 200,
   headers: {
  "Content-Type": "text/xml; charset=utf-8",
},
  });
}
