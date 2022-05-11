import { Fragment } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Dev from 'UI/Dev'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: [],
})

const Page: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Vinci - dev</title>
        <meta name="description" content="A NFT-backed DeFi Protocol for Boosting Liquidity and Hedging Volatility" />
      </Head>
      <Dev />
    </Fragment>
  )
}

export default __DEV__ ? Page : (): any => null
