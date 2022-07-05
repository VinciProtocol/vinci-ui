import type { GetStaticProps, NextPage } from 'next'

import Layout from 'UI/Layout'
import NFTAirdrop from 'UI/NFTAirdrop'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['nft-airdrop'],
})

const Page: NextPage = () => {
  return (
    <Layout title="NFTAirdrop">
      <NFTAirdrop />
    </Layout>
  )
}

export default Page
