import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";

export default defineConfig({
  site: "https://oui.nom.digital",

  integrations: [sitemap()],

  markdown: {
    remarkPlugins: [remarkBreaks],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
