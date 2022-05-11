import type { GetStaticProps, NextPage } from 'next'
import Layout from 'UI/Layout'
import Lend from 'UI/Lend'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['lend'],
})

const Page: NextPage = () => {
  return (
    <Layout title="App">
      <Lend />
    </Layout>
  )
}

export default Page
