import type { NextPage } from 'next'
import Head from 'next/head'

import Bubble from '../core/components/Bubble'
import SiteTemplate from '../core/components/SiteTemplate/SiteTemplate'

const CodePage: NextPage = () => {

  return (
    <>

      <Head>
        <title>Zac Miller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteTemplate header={<h1>About</h1>}>
        Zac attack
      </SiteTemplate>

    </>

  )

}

export default CodePage
