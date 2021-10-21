import React, { useCallback, useMemo } from 'react'

import SiteMenu from './SiteMenu'
import styles from './SiteSidebar.module.sass'


interface Props {}

const SiteSidebar: React.FC<Props> = props => {

  return (
    <aside className={styles.root}>

      <div className={styles.top}>
      </div>

      <div className={styles.main}>
        <SiteMenu />
      </div>

      <div className={styles.bottom}>
      </div>

    </aside>
  )

}

export default SiteSidebar
