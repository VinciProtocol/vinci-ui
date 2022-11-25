import type { GetStaticProps, NextPage } from 'next'
import Layout from 'UI/Layout'
import NFTFinance from 'UI/NFTFinance'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['nft-finance', 'dashboard'],
})

const Page: NextPage = () => {
  return (
    <Layout title="NFTFinance">
      <NFTFinance />
    </Layout>
  )
}

export default Page
