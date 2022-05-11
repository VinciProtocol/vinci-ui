import type { GetStaticProps, NextPage } from 'next'
import Layout from 'UI/Layout'
import Dashboard from 'UI/Dashboard'

import { withStaticTranslations } from 'app/i18n/hoc'

export const getStaticProps: GetStaticProps = withStaticTranslations((props) => ({ props }), {
  namespaces: ['my-dashboard', 'lend'],
})

const Page: NextPage = () => {
  return (
    <Layout title="Dashboard">
      <Dashboard />
    </Layout>
  )
}

export default Page
