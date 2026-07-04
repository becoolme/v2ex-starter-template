import { useEffect } from 'react';
import Link from 'next/link';
import { LOCALES, ROUTE_ALTERNATES, organizationJsonLd, type Locale } from '../lib/seo';
import { changelogEntries, homeCopy, seoCopy } from '../lib/site-content';
import PageSeo from './PageSeo';
import SiteFooter from './SiteFooter';

interface ChangelogPageProps {
  locale: Locale;
  canonicalPath: string;
}

export default function ChangelogPage({ locale, canonicalPath }: ChangelogPageProps) {
  const text = homeCopy[locale];
  const alternateHref = locale === 'zh' ? '/en/changelog' : '/changelog';
  const alternateLabel = locale === 'zh' ? 'English' : '中文';
  const homeHref = locale === 'zh' ? '/' : '/en';

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang;
  }, [locale]);

  return (
    <>
      <PageSeo
        title={seoCopy[locale].changelogTitle}
        description={seoCopy[locale].changelogDescription}
        canonicalPath={canonicalPath}
        locale={locale}
        alternates={ROUTE_ALTERNATES.changelog}
        structuredData={[organizationJsonLd()]}
      />
      <main className="mt-10 w-full max-w-4xl bg-white">
        <header className="mb-6 border-b border-black pb-4">
          <div className="mb-3 flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-normal text-gray-700">
                V2EX Starter Template
              </p>
              <h1 className="text-2xl font-bold text-black">{text.changelog}</h1>
            </div>
            <Link
              href={alternateHref}
              hrefLang={locale === 'zh' ? 'en' : 'zh-Hans'}
              className="border border-black bg-white px-2 py-1 font-mono text-xs font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              {alternateLabel}
            </Link>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-gray-800">
            {locale === 'zh'
              ? '这里记录面向用户可见的页面、演示和发现体验更新。'
              : 'User-facing updates for pages, demos, and discovery experience.'}
          </p>
          <Link
            href={homeHref}
            className="mt-4 inline-block font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600"
          >
            {locale === 'zh' ? '返回首页' : 'Back to home'}
          </Link>
        </header>

        <section className="grid gap-5">
          {changelogEntries[locale].map((entry) => (
            <article key={`${entry.date}-${entry.title}`} className="border border-black bg-[#fafafa]">
              <header className="border-b border-black bg-black px-4 py-2.5 text-white">
                <p className="text-xs font-bold">{entry.date}</p>
                <h2 className="text-sm font-bold">{entry.title}</h2>
              </header>
              <ul className="list-disc space-y-2 p-4 pl-8 text-sm leading-6 text-gray-800">
                {entry.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <SiteFooter locale={locale} />
      </main>
    </>
  );
}
