import React from 'react'
import { useRouter } from 'next/router'

import SiteMain from './SiteMain'
import SiteSidebar from './SiteSidebar'
import CloseSVG from '../../vectors/Close'
import styles from './SiteTemplate.module.sass'


interface Props {
  children: React.ReactNode
}

const SiteTemplate: React.FC<Props> = props => {

  const router = useRouter()

  return router.asPath === '/' ? <>{props.children}</> : (
    <div className={styles.root}>

      <SiteSidebar />

      <SiteMain>
        {props.children}
      </SiteMain>

      <button
        className={styles.homeBtn}
        type="button"
        onClick={() => router.push('/')}
      >
        <CloseSVG />
      </button>

    </div>
  )
}

export default SiteTemplate
