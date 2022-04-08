import type { Providers } from './config'

export type ProviderId = keyof Providers

export type Provider = Providers['injected']
export type ProviderStrings = keyof Provider['strings']

export type { Providers } from './config'
