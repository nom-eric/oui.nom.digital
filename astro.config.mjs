import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";
import remarkTrailingSlashInternalLinks from "./src/utils/remark-trailing-slash.js";

export default defineConfig({
  site: "https://oui.nom.digital",

  legacy: {
    collectionsBackwardsCompat: true,
  },

  integrations: [
    sitemap({
      filter: (page) => {
        if (page.includes("/textes/")) {
          return !page.includes("draft=true");
        }
        return true;
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkBreaks, remarkTrailingSlashInternalLinks],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});