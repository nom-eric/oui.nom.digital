<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">

    <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <title>Flux RSS — Øui</title>

        <style>
          body {
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: #edeff2;
            color: #1f2226;
            margin: 0;
            padding: 2rem 1rem;
            line-height: 1.6;
          }

          .container {
            max-width: 760px;
            margin: 0 auto;
          }

          h1 {
            font-size: 1.4rem;
            letter-spacing: -0.02em;
            margin-bottom: 1.2rem;
          }

          .meta {
            font-size: 0.85rem;
            color: #6a717c;
            margin-bottom: 2rem;
          }

          .item {
            padding: 1rem 1.2rem;
            border: 1px solid #d3d8e0;
            border-radius: 12px;
            background: #f7f8fa;
            margin-bottom: 1rem;
          }

          .item h2 {
            font-size: 1rem;
            margin: 0 0 0.3rem 0;
            letter-spacing: -0.01em;
          }

          .item a {
            color: #1f2226;
            text-decoration: none;
          }

          .item a:hover {
            text-decoration: underline;
          }

          .desc {
            font-size: 0.9rem;
            color: #6a717c;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>
            Flux RSS — <span style="color:#4c6f8a;">Ø</span>ui
          </h1>

          <div class="meta">
            Articles publiés · Lecture automatique ou humaine
          </div>

          <xsl:for-each select="rss/channel/item">
            <div class="item">
              <h2>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h2>

              <div class="desc">
                <xsl:value-of select="description"/>
              </div>
            </div>
          </xsl:for-each>

        </div>
      </body>
    </html>

  </xsl:template>
</xsl:stylesheet>
