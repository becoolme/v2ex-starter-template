# GEO/SEO implementation report

Date: 2026-07-04

## Scope

Implemented the P0 GEO/SEO fixes from `seo-audit/2026-07-04` and the low-risk P1 fixes that can ship in the same PR.

## Root cause

The app had grown as a single interactive demo page without static discovery assets, durable language URLs, structured page metadata, semantic document landmarks, or JSON-LD. Because the public HTML lacked these basics, crawlers and AI assistants had no sitemap entry point, no canonical or hreflang signals, no machine-readable entity graph, and weak visible context for the V2EX token and SDK workflows.

## User impact

Users now have stable Chinese and English entry points, FAQ pages, a changelog, a branded 404 page, copyable HTTPS install commands, clearer V2EX token facts, and better social sharing previews. Search engines and AI assistants get explicit discovery files, canonical metadata, structured data, and crawlable Q&A content.

## Fixes included

- Added crawler discovery files: `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt`.
- Added favicon and social preview assets: `public/favicon.svg`, `public/favicon.ico`, `public/og.svg`, and `public/og.png`.
- Added `pages/_document.tsx` so prerendered HTML declares `lang`.
- Rebuilt the homepage into semantic `main`, `section`, `h1`, `h2`, `h3`, and `footer` landmarks.
- Added canonical, robots, Open Graph, Twitter Card, hreflang, theme-color, favicon, and JSON-LD output through `components/PageSeo.tsx`.
- Added Organization, SoftwareApplication, and FAQPage JSON-LD with facts that also appear in visible page content.
- Added a V2EX token facts section with Solscan and repository links.
- Replaced the public SSH clone command with HTTPS clone text to avoid Cloudflare Email Obfuscation breaking copyable commands.
- Removed the external `@solana/web3.js@latest` page script and uses the bundled package import instead.
- Added explicit static routes for `/en`, `/faq`, `/en/faq`, `/changelog`, and `/en/changelog`.
- Added a branded bilingual `pages/404.tsx` with return links and `noindex, follow`.
- Replaced inline hover handlers with CSS hover classes.
- Added `scripts/seo-lint.mjs`, `pnpm lint`, `pnpm typecheck`, and a Husky pre-commit hook.

## Validation run

Commands run locally:

```bash
pnpm lint
pnpm build
pnpm exec next start -p 3100
curl -sSI http://localhost:3100/
curl -sSI http://localhost:3100/en
curl -sSI http://localhost:3100/faq
curl -sSI http://localhost:3100/sitemap.xml
curl -sS http://localhost:3100/robots.txt
curl -sS http://localhost:3100/llms.txt
curl -sS http://localhost:3100/ | rg -o '<html[^>]*>|<link rel="canonical"[^>]*>|<meta name="robots"[^>]*>|<meta property="og:title"[^>]*>|<meta name="twitter:card"[^>]*>|application/ld\+json|<main|<footer|<h[1-6][^>]*>|git@github|cf_email|@solana/web3\.js@latest'
curl -sS http://localhost:3100/en | rg -o '<html[^>]*>|<link rel="canonical"[^>]*>|<link rel="alternate"[^>]*>|<meta property="og:locale"[^>]*>|application/ld\+json|<h1[^>]*>|<h2[^>]*>|git@github|cf_email|@solana/web3\.js@latest'
curl -sS http://localhost:3100/404 | rg -o '<meta name="robots"[^>]*>|<h1[^>]*>|Page not found|页面未找到|<main|<footer'
```

Results:

- `pnpm lint` passed, including SEO regression checks and TypeScript.
- `pnpm build` passed. It reported Browserslist data freshness warnings only.
- `/`, `/en`, `/faq`, and `/sitemap.xml` returned 200 in local production preview.
- Homepage HTML includes `lang="zh-Hans"`, canonical, robots, OG, Twitter Card, 3 JSON-LD blocks, `main`, headings, and `footer`.
- `/en` HTML includes `lang="en"`, canonical `/en`, hreflang alternates, English OG locale, 3 JSON-LD blocks, and headings.
- `robots.txt` includes `User-agent`, `Allow`, `Disallow: /api/`, and `Sitemap`.
- `sitemap.xml` lists `/`, `/en`, `/faq`, `/en/faq`, `/changelog`, and `/en/changelog`.
- 404 output includes `noindex, follow`, branded bilingual copy, `main`, `h1`, and `footer`.
- Local HTML no longer exposes `git@github`, `cf_email`, or `@solana/web3.js@latest`.

## Production retest URLs

After deployment, retest:

- `https://v2ex.becool.dev/`
- `https://v2ex.becool.dev/en`
- `https://v2ex.becool.dev/faq`
- `https://v2ex.becool.dev/en/faq`
- `https://v2ex.becool.dev/changelog`
- `https://v2ex.becool.dev/en/changelog`
- `https://v2ex.becool.dev/404`
- `https://v2ex.becool.dev/sitemap.xml`
- `https://v2ex.becool.dev/robots.txt`
- `https://v2ex.becool.dev/llms.txt`
- `https://v2ex.becool.dev/og.png`

## Remaining follow-up

- Run mobile and desktop Lighthouse or PageSpeed Insights after production deployment to record CWV results.
- Decide separately whether to add deeper documentation routes such as `/docs/send` and `/docs/verify`.
