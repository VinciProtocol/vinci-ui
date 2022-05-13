import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Layout from 'UI/Layout'
import NFTLockdropDeposit from 'UI/NFTLockdropDeposit'

import { withStaticTranslations } from 'app/i18n/hoc'
import { NFTs } from 'app/web3/market'

export const getStaticProps: GetStaticProps = withStaticTranslations(
  (props) => {
    const { id } = props.params
    return {
      props: {
        ...props,
        nft: NFTs[typeof id === 'string' ? id : ''],
      },
    }
  },
  {
    namespaces: ['nft-lockdrop-deposit'],
  }
)
export const getStaticPaths: GetStaticPaths = function ({ locales }) {
  const ids = Object.keys(NFTs)
  const paths = [] as any

  locales.forEach((locale) => {
    ids.forEach((id) => {
      paths.push({
        params: { id },
        locale,
      })
    })
  })

  return {
    paths,
    fallback: false,
  }
}

const Page: NextPage = () => {
  return (
    <Layout title="NFTLockdropDeposit">
      <NFTLockdropDeposit />
    </Layout>
  )
}

export default Page
