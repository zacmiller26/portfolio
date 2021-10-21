import React from 'react'

import styles from './SiteMain.module.sass'

interface Props {
  children: React.ReactNode
}

const SiteMain: React.FC<Props> = props => {
  return (
    <main className={styles.root}>
      {props.children}
    </main>
  )
}

export default SiteMain
