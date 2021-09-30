import React from 'react'

import SiteMain from './SiteMain'
import SiteSidebar from './SiteSidebar'
//import PatternSVG from '../../vectors/Pattern'
import styles from './SiteTemplate.module.sass'


interface Props {
  header?: React.ReactNode
  children: React.ReactNode
}

const SiteTemplate: React.FC<Props> = props => {
  return (
    <div className={styles.root}>

      <SiteSidebar />

      <SiteMain header={props.header}>
        {props.children}
      </SiteMain>

    </div>
  )
}

export default SiteTemplate
