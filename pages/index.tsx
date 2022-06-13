import type { GetStaticProps, NextPage } from 'next'

import Layout from 'UI/Layout'
import NFTLockdrop from 'UI/NFTLockdrop'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['nft-lockdrop'],
})

const Page: NextPage = () => {
  return (
    <Layout title="NFTLockdrop">
      <NFTLockdrop />
    </Layout>
  )
}

export default Page
