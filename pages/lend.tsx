import type { GetStaticProps, NextPage } from 'next'

import Layout from 'UI/Layout'
import Lend from 'UI/Lend'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: [].concat(['menu'], ['lend']),
})

const Page: NextPage = () => {
  return (
    <Layout title="Lend">
      <Lend />
    </Layout>
  )
}

export default Page
