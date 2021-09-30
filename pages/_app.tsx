import '../styles/globals.sass'

import type { AppProps } from 'next/app'
import Head from 'next/head'

import { AuthUserProvider } from '../core/contexts/authUser'
import { SiteThemeProvider } from '../core/contexts/siteTheme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700&family=Codystar:wght@300&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthUserProvider>
        <SiteThemeProvider>
          <Component {...pageProps} />
        </SiteThemeProvider>
      </AuthUserProvider>
      <div id="modal-root" />
    </>
  )
}
export default MyApp
