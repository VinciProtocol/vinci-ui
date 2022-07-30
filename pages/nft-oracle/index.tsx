import type { GetStaticProps, NextPage } from 'next'

import Layout from 'UI/Layout'
import NFTOracle from 'UI/NFTOracle'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['nft-oracle'],
})

const Page: NextPage = () => {
  return (
    <Layout title="NFTOracle">
      <NFTOracle />
    </Layout>
  )
}

export default Page
