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

      <SiteTemplate>
        <Bubble>
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
        </Bubble>
        <Bubble>
          {process.env.NEXT_PUBLIC_CONTACT_PHONE}
        </Bubble>
        <Bubble>
          {process.env.NEXT_PUBLIC_IG_PROFILE}
        </Bubble>
        <Bubble>
          {process.env.NEXT_PUBLIC_GITHUB_PROFILE}
        </Bubble>
      </SiteTemplate>

    </>

  )

}

export default CodePage
