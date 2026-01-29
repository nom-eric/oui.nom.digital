#!/usr/bin/env zsh
set -euo pipefail

ROOT="oui"

# Helper: create dir if missing
mkd() {
  [[ -d "$1" ]] || mkdir -p "$1"
}

# Helper: create file if missing
mkf() {
  [[ -f "$1" ]] || touch "$1"
}

# Dossiers
mkd "$ROOT/src/components"
mkd "$ROOT/src/lib"
mkd "$ROOT/src/layouts"
mkd "$ROOT/src/styles"
mkd "$ROOT/src/content/articles"
mkd "$ROOT/src/pages/articles"

# Fichiers pages
mkf "$ROOT/src/pages/index.astro"
mkf "$ROOT/src/pages/cadre.astro"
mkf "$ROOT/src/pages/livre.astro"
mkf "$ROOT/src/pages/a-propos.astro"
mkf "$ROOT/src/pages/mentions-legales.astro"
mkf "$ROOT/src/pages/rss.xml.ts"

# Brackets doivent être quotés
mkf "$ROOT/src/pages/articles/index.astro"
mkf "$ROOT/src/pages/articles/[slug].astro"

# README
mkf "$ROOT/README.md"

echo "Structure vérifiée / complétée dans ./$ROOT"

