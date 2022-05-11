import type { GetStaticProps, NextPage } from 'next'
import Layout from 'UI/Layout'
import Borrow from 'UI/Borrow'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['borrow'],
})

const Page: NextPage = () => {
  return (
    <Layout title="Borrow">
      <Borrow />
    </Layout>
  )
}

export default Page
