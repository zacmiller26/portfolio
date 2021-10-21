import '../styles/globals.sass'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence } from "framer-motion"

import { AuthUserProvider } from '../core/contexts/authUser'
import { SiteThemeProvider } from '../core/contexts/siteTheme'
import SiteTemplate from '../core/components/SiteTemplate/SiteTemplate'


function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=0, initial-scale=1"
        />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1e232f" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="nofollow, noindex" />
        <link rel="mask-icon" href='/favicon.svg' color="#2bb7ff" />
        <link rel="icon" href='/favicon.png' />
        <link rel="shortcut icon" href='/favicon.png' />
        <link rel="apple-touch-icon" href='/favicon.png' />
        <link rel="apple-touch-icon-precomposed" href='/favicon.png' />
        <meta property="og:site_name" content="Web Portfolio" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Londrina+Outline"
          rel="stylesheet"
        />
      </Head>
      <AuthUserProvider>
        <SiteThemeProvider>
          <Head>
            <title>Zac Miller</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <AnimatePresence initial={false} exitBeforeEnter={true}>
            <SiteTemplate>
                <Component {...pageProps} key={router.route} />
            </SiteTemplate>
          </AnimatePresence>
        </SiteThemeProvider>
      </AuthUserProvider>
      <div id="modal-root" />
    </>
  )
}
export default MyApp
