import type { FC } from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import type { LayoutProps } from './types'

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const { t } = useTranslation()
  return (
    <Fragment>
      <Head>
        <title>Vinci - {t('menu.' + title)}</title>
        <meta name="description" content="A NFT-backed DeFi Protocol for Boosting Liquidity and Hedging Volatility" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vinci Protocol | DeFing NFTs" />
        <meta property="og:image" content="https://app.vinci.io/logo.jpeg" />
        <meta
          property="og:description"
          content="A NFT-backed DeFi Protocol for Boosting Liquidity and Hedging Volatility"
        />
        <meta property="og:title" content="Vinci Protocol" />
        <meta property="og:url" content="https://app.vinci.io" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Vinci Protocol | DeFing NFTs" />
        <meta name="twitter:site" content="@VinciProtocol" />
      </Head>
      <Header />
      <Main>{children}</Main>
      {/* <Footer /> */}
    </Fragment>
  )
}

export default Layout
