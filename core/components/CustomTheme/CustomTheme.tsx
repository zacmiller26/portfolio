import React from 'react'

import ThemeBar from '../SiteTemplate/ThemeBar'
import styles from './CustomTheme.module.sass'


interface Props {}

const CustomTheme: React.FC<Props> = () => {
  return (
    <div className={styles.root}>
      <ThemeBar top={true} className={styles.themeBar} />
    </div>
  )
}

export default CustomTheme
