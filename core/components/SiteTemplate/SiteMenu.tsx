import React from 'react'

import { MenuMapType } from '../../../pages/index'
import useViewportMeta from '../../hooks/useViewportMeta'
import CodeSVG from '../../vectors/Code'
import HomeSVG from '../../vectors/Home'
import PhoneSVG from '../../vectors/Phone'
import UserSVG from '../../vectors/User'
import Container from '../Container'
import styles from './SiteMenu.module.sass'


interface Props {
  menuMap: MenuMapType
}

const SiteMenu: React.FC<Props> = props => {

  const { isMobile } = useViewportMeta()

  return isMobile ? <MobileSiteMenu {...props} /> : (
    <Container className={styles.root}>
      {props.menuMap.map(([label, _ref, _component, isActive, scrollFn]) => (
        <button
          type="button"
          data-active={isActive}
          onClick={() => scrollFn()}
          key={label}
        >
          {label}
        </button>
      ))}
    </Container>
  )
}

const MobileSiteMenu: React.FC<Props> = ({ menuMap }) => {
  return (
    <div className={styles.mobileRoot}>

      <button
        type="button"
        onClick={() => menuMap[0][5]()}
      >
          <HomeSVG />
      </button>

      {menuMap.map(([label, _ref, _component, isActive, scrollFn]) => (
        <button
          type="button"
          data-active={isActive}
          onClick={() => scrollFn()}
          key={label}
        >
          {label.toLowerCase().includes('about') ?
            <UserSVG />
          : label.toLowerCase().includes('contact') ?
            <PhoneSVG />
          :
            <CodeSVG />
          }
        </button>
      ))}
      
    </div>
  )
}

export default SiteMenu
