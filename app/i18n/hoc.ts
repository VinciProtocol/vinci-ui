import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from 'next-i18next.config'

import { createWithGetStaticProps } from 'app/hoc/creators/createWithGetStaticProps'

type StaticTranslationsOptions = {
  namespaces?: string[]
}

export const withStaticTranslations = createWithGetStaticProps(
  async (props, { namespaces }: StaticTranslationsOptions) => {
    const serverSideTranslationsProps = await serverSideTranslations(
      props.locale,
      ['common', 'router', ...(namespaces || [])],
      nextI18NextConfig
    )
    return {
      ...props,
      ...serverSideTranslationsProps,
    }
  }
)
