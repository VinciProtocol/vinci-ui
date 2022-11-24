import { Provider as StoreProvider } from 'react-redux'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import store from 'store'

import '@vinci-protocol/math'
import { appWithTranslation, useI18nHMR } from 'app/i18n'
import App from 'app/App'
import ThemeProvider from 'app/Theme'
import Wallet from 'app/wallet'
import DomainsProvider from 'domains'

import { ToastContainer } from 'lib/toastify'
import { initChartjs } from 'lib/chartjs'

import 'styles/global.css'
import 'lib/toastify/styles.css'

initChartjs()

function MyApp({ Component, pageProps }: AppProps) {
  useI18nHMR()
  return (
    <StoreProvider store={store}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wallet>
        <DomainsProvider>
          <App>
            <ThemeProvider>
              <CssBaseline />
              <Component {...pageProps} />
              <ToastContainer />
            </ThemeProvider>
          </App>
        </DomainsProvider>
      </Wallet>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp)
