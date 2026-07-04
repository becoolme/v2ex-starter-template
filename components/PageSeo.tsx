import Head from 'next/head';
import {
  LOCALES,
  ROUTE_ALTERNATES,
  SITE_NAME,
  absoluteUrl,
  type Locale,
} from '../lib/seo';

type AlternatePaths = (typeof ROUTE_ALTERNATES)[keyof typeof ROUTE_ALTERNATES];

interface PageSeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  locale: Locale;
  alternates?: AlternatePaths;
  robots?: string;
  structuredData?: ReadonlyArray<Record<string, unknown>>;
}

export default function PageSeo({
  title,
  description,
  canonicalPath,
  locale,
  alternates,
  robots = 'index, follow, max-image-preview:large',
  structuredData = [],
}: PageSeoProps) {
  const canonicalUrl = absoluteUrl(canonicalPath);
  const imageUrl = absoluteUrl('/og.png');

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      {alternates && (
        <>
          <link rel="alternate" hrefLang="zh-Hans" href={absoluteUrl(alternates.zh)} />
          <link rel="alternate" hrefLang="en" href={absoluteUrl(alternates.en)} />
          <link rel="alternate" hrefLang="x-default" href={absoluteUrl(alternates.xDefault)} />
        </>
      )}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <meta name="theme-color" content="#000000" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={LOCALES[locale].ogLocale} />
      <meta
        property="og:locale:alternate"
        content={locale === 'zh' ? LOCALES.en.ogLocale : LOCALES.zh.ogLocale}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@becool_me" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {structuredData.map((entry, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </Head>
  );
}
