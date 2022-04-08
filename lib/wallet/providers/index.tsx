import { isElectron } from './envs'
import { providers, unknownProvider } from './config'
import type { Provider, ProviderId, ProviderStrings } from './types'

// Get a providers object for a given ID.
function getProvider(providerId: ProviderId): Provider | undefined {
  return providers[providerId] || unknownProvider
}

// Get a string that depends on the current Ethereum provider.
// The default string is used as an identifier (à la gettext).
function getProviderString(string: ProviderStrings, providerId: ProviderId = 'unknown'): string {
  const provider = getProvider(providerId)
  return (provider && provider.strings[string]) || string
}

// Get an identifier for the provider, if it can be detected.
function identifyProvider(provider: any) {
  if (provider && isElectron()) {
    return 'frame'
  }
  if (provider && provider.isMetaMask) {
    return 'metamask'
  }
  return 'unknown'
}

// Get a provider from its useWallet() identifier.
function getProviderFromUseWalletId(id: ProviderId) {
  if (id === 'injected') {
    return getProvider(identifyProvider(window.ethereum) as any)
  }
  return getProvider(id)
}

export { getProvider, identifyProvider, getProviderString, getProviderFromUseWalletId }

export default providers
