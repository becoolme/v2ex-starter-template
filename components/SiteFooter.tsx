import Link from 'next/link';
import { homeCopy } from '../lib/site-content';
import { REPOSITORY_URL, V2EX_PROFILE_URL, X_URL, type Locale } from '../lib/seo';

interface SiteFooterProps {
  locale: Locale;
}

export default function SiteFooter({ locale }: SiteFooterProps) {
  const text = homeCopy[locale];
  const faqHref = locale === 'zh' ? '/faq' : '/en/faq';
  const changelogHref = locale === 'zh' ? '/changelog' : '/en/changelog';

  return (
    <footer className="border-t border-black mt-10 pt-5 text-sm">
      <nav aria-label="Site and external links" className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
        <Link href={faqHref} className="font-bold text-black no-underline hover:text-gray-600">
          {text.faqTitle}
        </Link>
        <Link href={changelogHref} className="font-bold text-black no-underline hover:text-gray-600">
          {text.changelog}
        </Link>
        <a
          href={REPOSITORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-black no-underline hover:text-gray-600"
        >
          {text.footerRepo}
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-black no-underline hover:text-gray-600"
        >
          {text.footerX}
        </a>
        <a
          href={V2EX_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-black no-underline hover:text-gray-600"
        >
          {text.footerV2ex}
        </a>
      </nav>
      <p className="mt-4 text-xs leading-5 text-gray-700">{text.disclaimer}</p>
    </footer>
  );
}
