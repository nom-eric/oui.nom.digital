export default function remarkTrailingSlashInternalLinks() {
  return (tree) => {
    const visit = (node) => {
      if (!node) return;

      if (node.type === "link" && typeof node.url === "string") {
        node.url = normalize(node.url);
      }

      const children = node.children;
      if (Array.isArray(children)) {
        for (const child of children) visit(child);
      }
    };

    visit(tree);
  };
}

function normalize(url) {
  if (!url) return url;

  if (
    url.startsWith("#") ||
    url.startsWith("?") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    /^https?:\/\//i.test(url)
  ) {
    return url;
  }

  if (!url.startsWith("/")) return url;

  // fichiers (rss.xml, images, pdf, etc.)
  if (/\.[a-z0-9]{2,5}($|\?|\#)/i.test(url)) return url;

  if (url === "/" || url.endsWith("/")) return url;

  const m = url.match(/^([^?#]+)([?#].*)?$/);
  const path = (m && m[1]) ? m[1] : url;
  const suffix = (m && m[2]) ? m[2] : "";

  return path + "/" + suffix;
}
