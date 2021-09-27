import React from 'react'

import SiteMain from './SiteMain'
import SiteSidebar from './SiteSidebar'
//import PatternSVG from '../../vectors/Pattern'
import styles from './SiteTemplate.module.sass'


interface Props {
  children: React.ReactNode
}

const SiteTemplate: React.FC<Props> = props => {
  return (
    <div className={styles.root}>

      {/*<Container>
        <ThemeBar />
      </Container>

      <Header />

      <SiteMenu />*/}

      <SiteSidebar />

      <SiteMain>
        {props.children}
      </SiteMain>

    </div>
  )
}

export default SiteTemplate
