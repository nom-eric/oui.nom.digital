import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import remarkBreaks from "remark-breaks";

export default defineConfig({
  site: "https://oui.nom.digital",

  integrations: [
    sitemap({
      filter: (page) => {
        // Exclut les pages qui contiennent "/textes/" ET sont en draft
        if (page.includes("/textes/")) {
          return !page.includes("draft=true");
        }
        return true;
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkBreaks],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
