import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    const page = (this.props as any).__NEXT_DATA__?.page || '/';
    const lang = page.startsWith('/en') || page === '/404' ? 'en' : 'zh-Hans';

    return (
      <Html lang={lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
