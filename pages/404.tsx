import Link from 'next/link';
import PageSeo from '../components/PageSeo';
import SiteFooter from '../components/SiteFooter';
import { organizationJsonLd } from '../lib/seo';
import { seoCopy } from '../lib/site-content';

export default function Custom404() {
  return (
    <>
      <PageSeo
        title={seoCopy.en.notFoundTitle}
        description={seoCopy.en.notFoundDescription}
        canonicalPath="/404"
        locale="en"
        robots="noindex, follow"
        structuredData={[organizationJsonLd()]}
      />
      <main className="mt-10 w-full max-w-4xl bg-white">
        <section className="border border-black bg-[#fafafa]">
          <h1 className="border-b border-black bg-black px-4 py-3 text-xl font-bold text-white">
            Page not found / 页面未找到
          </h1>
          <div className="space-y-4 p-4 text-sm leading-6 text-gray-800">
            <p>
              The page you requested does not exist. You can return to the V2EX Starter Template demo, read the FAQ, or open the GitHub repository.
            </p>
            <p>
              你访问的页面不存在。可以返回 V2EX Starter Template 演示页，查看 FAQ，或打开 GitHub 仓库。
            </p>
            <nav aria-label="404 navigation" className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link href="/" className="font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600">
                Home
              </Link>
              <Link href="/en" className="font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600">
                English
              </Link>
              <Link href="/faq" className="font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600">
                FAQ
              </Link>
              <a
                href="https://github.com/becoolme/v2ex-starter-template"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-black underline decoration-black underline-offset-2 hover:text-gray-600"
              >
                GitHub
              </a>
            </nav>
          </div>
        </section>
        <SiteFooter locale="en" />
      </main>
    </>
  );
}
