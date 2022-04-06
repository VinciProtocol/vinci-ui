import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { createWithGetStaticProps } from 'app/hoc/creators/createWithGetStaticProps'

type StaticTranslationsOptions = {
  namespaces?: string[]
}

export const withStaticTranslations = createWithGetStaticProps(
  async (props, { namespaces }: StaticTranslationsOptions) => ({
    ...props,
    ...(await serverSideTranslations(props.locale, ['common', ...(namespaces || [])])),
  })
)
