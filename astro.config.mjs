import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";

export default defineConfig({
  site: "https://oui.nom.digital",

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/transmission"),
    }),
  ],

  markdown: {
    remarkPlugins: [remarkBreaks],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
