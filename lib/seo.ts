export type Locale = 'zh' | 'en';

export const SITE_URL = 'https://v2ex.becool.dev';
export const SITE_NAME = 'V2EX Starter Template';
export const REPOSITORY_URL = 'https://github.com/becoolme/v2ex-starter-template';
export const X_URL = 'https://x.com/becool_me';
export const V2EX_PROFILE_URL = 'https://v2ex.com/member/BeCool';
export const TOKEN_ADDRESS = '9raUVuzeWUk53co63M4WXLWPWE4Xc6Lpn7RS9dnkpump';
export const TOKEN_DECIMALS = 6;
export const TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
export const TOKEN_EXPLORER_URL = `https://solscan.io/token/${TOKEN_ADDRESS}`;

export const LOCALES: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  zh: {
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
    label: '中文',
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    label: 'English',
  },
};

export const ROUTE_ALTERNATES = {
  home: {
    zh: '/',
    en: '/en',
    xDefault: '/',
  },
  faq: {
    zh: '/faq',
    en: '/en/faq',
    xDefault: '/faq',
  },
  changelog: {
    zh: '/changelog',
    en: '/en/changelog',
    xDefault: '/changelog',
  },
} as const;

export const SITEMAP_ROUTES = [
  { path: '/', lastmod: '2026-07-04', changefreq: 'weekly', priority: '1.0' },
  { path: '/en', lastmod: '2026-07-04', changefreq: 'weekly', priority: '0.9' },
  { path: '/faq', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.8' },
  { path: '/en/faq', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.8' },
  { path: '/changelog', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.5' },
  { path: '/en/changelog', lastmod: '2026-07-04', changefreq: 'monthly', priority: '0.5' },
] as const;

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) {
    return path;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'becool',
    alternateName: 'BeCool',
    url: SITE_URL,
    logo: absoluteUrl('/favicon.svg'),
    sameAs: [
      'https://github.com/becoolme',
      X_URL,
      V2EX_PROFILE_URL,
    ],
  };
}

export function softwareApplicationJsonLd(locale: Locale) {
  const description =
    locale === 'zh'
      ? 'V2EX Starter Template 是一个 Next.js 模板，用于在 Solana 主网上连接钱包、发送 V2EX 或 SOL、查询余额、检查交易、签名与验签。'
      : 'V2EX Starter Template is a Next.js template for connecting Solana wallets, sending V2EX or SOL, querying balances, inspecting transactions, signing messages, and verifying signatures.';

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Node.js 18+',
    description,
    inLanguage: LOCALES[locale].htmlLang,
    programmingLanguage: ['TypeScript', 'JavaScript'],
    codeRepository: REPOSITORY_URL,
    author: {
      '@type': 'Person',
      name: 'BeCool',
      url: 'https://github.com/becoolme',
      sameAs: [X_URL, V2EX_PROFILE_URL],
    },
    sameAs: [REPOSITORY_URL, TOKEN_EXPLORER_URL],
  };
}

export function faqPageJsonLd(
  faqItems: ReadonlyArray<{ question: string; answer: string }>,
  locale: Locale,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: LOCALES[locale].htmlLang,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
