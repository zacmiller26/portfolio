import type { NextPage } from 'next'
import Head from 'next/head'

import SiteTemplate from '../core/components/SiteTemplate/SiteTemplate'
import styles from '../styles/pages/about.module.sass'


const CodePage: NextPage = () => {

  return (
    <>

      <Head>
        <title>Zac Miller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteTemplate>
        <div className={styles.root}>
          <div className={styles.avatar} />
          <p>
            <i>Hi, I'm Zac</i><br /><br />
            I love the process of taking <em>raw ideas</em> and
            manifesting them into <em>reality</em> in the form of
            {' '}<em>intuitive</em> web applications.
            <br /><br />
            I've learned a <em>ton</em> about that process
            as my own projects have accumulated over <em>1.1 billion</em> page views,
            {' '}<em>25 million</em>
            {' '}unique users, and peaking at over <em>3.5 million</em> monthly
            users.
          </p>
        </div>
      </SiteTemplate>

    </>

  )

}

export default CodePage
