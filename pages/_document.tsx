/* eslint-disable @next/next/next-script-for-ga */
import type { DocumentContext } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/ubc5csr.css" />
          <script
            id="gtm"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function hideEmblem() {
              var el = document.createElement('style');
              document.head.appendChild(el);
              var styleSheet = el.sheet;
              styleSheet.insertRule('.certik-emblem { display: none; }', 0);
            })();`,
            }}
          ></script>
          <script async src="https://emblem.certik-assets.com/script?pid=vinci-protocol&vid=a23f4b88"></script>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
