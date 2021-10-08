import React from 'react'
import Link from 'next/link'

//import useViewportMeta from '../../hooks/useViewportMeta'
import { MenuMapType } from '../../../pages/info'
import SiteMain from './SiteMain'
import SiteSidebar from './SiteSidebar'
import CloseSVG from '../../vectors/Close'
import styles from './SiteTemplate.module.sass'


interface Props {
  menuMap: MenuMapType
  children: React.ReactNode
}

const SiteTemplate: React.FC<Props> = props => {

  //const { isMobile } = useViewportMeta()

  return (
    <div className={styles.root}>

      <SiteSidebar menuMap={props.menuMap} />

      <SiteMain>
        {props.children}
      </SiteMain>

      <Link href="/">
        <a className={styles.homeLink}>
          <CloseSVG />
        </a>
      </Link>

    </div>
  )
}

export default SiteTemplate
