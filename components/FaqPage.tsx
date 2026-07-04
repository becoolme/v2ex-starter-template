import { useEffect } from 'react';
import Link from 'next/link';
import {
  LOCALES,
  ROUTE_ALTERNATES,
  faqPageJsonLd,
  organizationJsonLd,
  type Locale,
} from '../lib/seo';
import { faqItems, homeCopy, seoCopy } from '../lib/site-content';
import PageSeo from './PageSeo';
import SiteFooter from './SiteFooter';

interface FaqPageProps {
  locale: Locale;
  canonicalPath: string;
}

export default function FaqPage({ locale, canonicalPath }: FaqPageProps) {
  const text = homeCopy[locale];
  const alternateHref = locale === 'zh' ? '/en/faq' : '/faq';
  const alternateLabel = locale === 'zh' ? 'English' : '中文';
  const homeHref = locale === 'zh' ? '/' : '/en';

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang;
  }, [locale]);

  return (
    <>
      <PageSeo
        title={seoCopy[locale].faqTitle}
        description={seoCopy[locale].faqDescription}
        canonicalPath={canonicalPath}
        locale={locale}
        alternates={ROUTE_ALTERNATES.faq}
        structuredData={[organizationJsonLd(), faqPageJsonLd(faqItems[locale], locale)]}
      />
      <main className="mt-10 w-full max-w-4xl bg-white">
        <header className="mb-6 border-b border-black pb-4">
          <div className="mb-3 flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-normal text-gray-700">
                V2EX Starter Template
              </p>
              <h1 className="text-2xl font-bold text-black">{text.faqTitle}</h1>
            </div>
            <Link
              href={alternateHref}
              hrefLang={locale === 'zh' ? 'en' : 'zh-Hans'}
              className="border border-black bg-white px-2 py-1 font-mono text-xs font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              {alternateLabel}
            </Link>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-gray-800">{text.faqIntro}</p>
          <Link
            href={homeHref}
            className="mt-4 inline-block font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600"
          >
            {locale === 'zh' ? '返回首页' : 'Back to home'}
          </Link>
        </header>

        <section className="grid gap-5">
          {faqItems[locale].map((item) => (
            <article key={item.question} className="border border-black bg-[#fafafa]">
              <h2 className="border-b border-black bg-black px-4 py-2.5 text-sm font-bold text-white">
                {item.question}
              </h2>
              <p className="p-4 text-sm leading-6 text-gray-800">{item.answer}</p>
            </article>
          ))}
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
