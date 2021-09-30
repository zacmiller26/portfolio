import React from 'react'

import styles from './SiteMain.module.sass'

interface Props {
  header?: React.ReactNode
  children: React.ReactNode
}

const SiteMain: React.FC<Props> = props => {
  return (
    <main className={styles.root}>

      {props.header && <div className={styles.header}>
        <div>
          {props.header}
        </div>
      </div>}

      <div className={styles.content}>
        <div>
          {props.children}
        </div>
      </div>
    </main>
  )
}

export default SiteMain
