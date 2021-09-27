import React from 'react'

import styles from './SiteMain.module.sass'

interface Props {
  children: React.ReactNode
}

const SiteMain: React.FC<Props> = props => {
  return (
    <main className={styles.root}>
      <div>
        <div>
          {props.children}
        </div>
      </div>
    </main>
  )
}

export default SiteMain
