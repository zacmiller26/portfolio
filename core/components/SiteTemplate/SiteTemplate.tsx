import React from 'react'

import { MenuMapType } from '../../../pages/index'
import SiteMain from './SiteMain'
import SiteSidebar from './SiteSidebar'
import CloseSVG from '../../vectors/Close'
import styles from './SiteTemplate.module.sass'


interface Props {
  menuMap: MenuMapType
  goHome: Function
  children: React.ReactNode
}

const SiteTemplate: React.FC<Props> = props => {

  return (
    <div className={styles.root}>

      <SiteSidebar menuMap={props.menuMap} />

      <SiteMain>
        {props.children}
      </SiteMain>

      <button
        className={styles.homeBtn}
        type="button"
        onClick={() => props.goHome()}
      >
        <CloseSVG />
      </button>

    </div>
  )
}

export default SiteTemplate
