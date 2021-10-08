import React from 'react'

import { MenuMapType } from '../../../pages/index'
import Container from '../Container'
import styles from './SiteMenu.module.sass'


interface Props {
  menuMap: MenuMapType
}

const SiteMenu: React.FC<Props> = props => {
  return (
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

export default SiteMenu
