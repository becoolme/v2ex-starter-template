import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/llms.txt',
  'public/favicon.svg',
  'public/og.png',
  'pages/_document.tsx',
  'pages/404.tsx',
  'pages/en.tsx',
  'pages/faq.tsx',
  'pages/en/faq.tsx',
  'pages/changelog.tsx',
  'pages/en/changelog.tsx',
];

const requiredSitemapPaths = ['/', '/en', '/faq', '/en/faq', '/changelog', '/en/changelog'];
const sourceRoots = ['components', 'lib', 'pages', 'public'];
const forbiddenPatterns = [
  {
    pattern: /@solana\/web3\.js@latest/,
    message: 'Use a pinned @solana/web3.js version or the bundled package import instead of @latest.',
  },
  {
    pattern: /git@github\.com/,
    message: 'Use HTTPS clone URLs in public copy so Cloudflare Email Obfuscation cannot rewrite commands.',
  },
  {
    pattern: /onMouseEnter|onMouseLeave/,
    message: 'Use CSS hover styles instead of inline hover handlers.',
  },
  {
    pattern: /—/,
    message: 'Do not use em dashes in public copy.',
  },
];

const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir) {
  const absoluteDir = path.join(root, dir);
  if (!fs.existsSync(absoluteDir)) return [];

  return fs.readdirSync(absoluteDir, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(relativePath);
    }

    return [relativePath];
  });
}

for (const file of requiredFiles) {
  if (!exists(file)) {
    failures.push(`Missing required SEO file: ${file}`);
  }
}

if (exists('public/robots.txt')) {
  const robots = read('public/robots.txt');
  if (!/^User-agent:\s*\*/m.test(robots)) {
    failures.push('robots.txt must include User-agent: *.');
  }
  if (!/^Allow:\s*\//m.test(robots)) {
    failures.push('robots.txt must explicitly allow the public site.');
  }
  if (!/^Disallow:\s*\/api\//m.test(robots)) {
    failures.push('robots.txt must disallow /api/ crawl paths.');
  }
  if (!/^Sitemap:\s*https:\/\/v2ex\.becool\.dev\/sitemap\.xml/m.test(robots)) {
    failures.push('robots.txt must declare the canonical sitemap URL.');
  }
}

if (exists('public/sitemap.xml')) {
  const sitemap = read('public/sitemap.xml');
  for (const route of requiredSitemapPaths) {
    const url = `https://v2ex.becool.dev${route === '/' ? '/' : route}`;
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      failures.push(`sitemap.xml is missing ${url}.`);
    }
  }
}

if (exists('components/PageSeo.tsx')) {
  const seoHead = read('components/PageSeo.tsx');
  for (const needle of [
    'rel="canonical"',
    'name="robots"',
    'property="og:title"',
    'name="twitter:card"',
    'application/ld+json',
    'rel="alternate"',
  ]) {
    if (!seoHead.includes(needle)) {
      failures.push(`PageSeo.tsx is missing ${needle}.`);
    }
  }
}

if (exists('components/HomePage.tsx')) {
  const home = read('components/HomePage.tsx');
  for (const needle of ['<main', '<h1', '<h2', '<SiteFooter', 'faqPageJsonLd', 'softwareApplicationJsonLd']) {
    if (!home.includes(needle)) {
      failures.push(`HomePage.tsx is missing ${needle}.`);
    }
  }
}

if (exists('components/SiteFooter.tsx') && !read('components/SiteFooter.tsx').includes('<footer')) {
  failures.push('SiteFooter.tsx must render a semantic footer.');
}

if (exists('pages/_document.tsx')) {
  const documentSource = read('pages/_document.tsx');
  if (!documentSource.includes('<Html lang={lang}>')) {
    failures.push('_document.tsx must render an explicit html lang attribute.');
  }
}

const sourceFiles = sourceRoots
  .flatMap(walk)
  .filter((file) => /\.(tsx?|jsx?|css|html|txt|xml|svg|md)$/.test(file));

for (const file of sourceFiles) {
  const source = read(file);
  for (const { pattern, message } of forbiddenPatterns) {
    if (pattern.test(source)) {
      failures.push(`${file}: ${message}`);
    }
  }
}

if (failures.length > 0) {
  console.error('SEO lint failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('SEO lint passed.');
