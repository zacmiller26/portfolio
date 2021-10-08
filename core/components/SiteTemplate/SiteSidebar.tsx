import React, { useCallback, useMemo } from 'react'

import { MenuMapType } from '../../../pages/info'
import SiteMenu from './SiteMenu'
import ThemeBar from './ThemeBar'
import styles from './SiteSidebar.module.sass'


interface Props {
  menuMap: MenuMapType
}

const SiteSidebar: React.FC<Props> = props => {

  const activeIndex = useMemo(() => {
    return props.menuMap.findIndex(([_a, _b, _c, isActive]) => isActive)
  }, [props.menuMap])

  const scrollToSection = useCallback((index: number) => {
    return props.menuMap[0][4](index)
  }, [props.menuMap])

  const btnDown = useMemo(() => {

    const { menuMap } = props

    if(!menuMap[activeIndex + 1]) return <span />
    return (
      <button
        className={styles.arrowBtn}
        data-dir="down"
        type="button"
        onClick={() => scrollToSection(activeIndex + 1)}
      >
        &darr;
      </button>
    )

  }, [props.menuMap, activeIndex])

  const btnUp = useMemo(() => {

    const { menuMap } = props

    if(!menuMap[activeIndex - 1]) return <span />
    return (
      <button
        className={styles.arrowBtn}
        data-dir="up"
        type="button"
        onClick={() => scrollToSection(activeIndex - 1)}
      >
        &uarr;
      </button>
    )

  }, [props.menuMap, activeIndex])

  return (
    <aside className={styles.root}>

      <div className={styles.top}>
        {btnUp}
      </div>

      <div className={styles.main}>
        <SiteMenu menuMap={props.menuMap} />
      </div>

      <div className={styles.footer}>
        <ThemeBar />
      </div>

      <div className={styles.bottom}>
        {btnDown}
      </div>

    </aside>
  )

}

export default SiteSidebar
