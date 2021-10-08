import type { NextPage } from 'next'
import Head from 'next/head'
import { createRef, useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'

import useViewportMeta from '../core/hooks/useViewportMeta'
import About from '../core/contents/About'
import Contact from '../core/contents/Contact'
import Examples from '../core/contents/Examples'
import SiteTemplate from '../core/components/SiteTemplate/SiteTemplate'
import styles from '../styles/pages/info.module.sass'


export type MenuMapType = [
  string, // label
  React.RefObject<HTMLDivElement>, // component ref
  React.ReactNode, // component
  boolean, // is active
  (i?: number) => void // scroll to component
][]

const SECTIONS = {
  About: <About />,
  'Code Examples': <Examples />,
  Contact: <Contact />
}

const InfoPage: NextPage = () => {

  const { viewport } = useViewportMeta()
  const [top, setTop] = useState<undefined | string>(undefined)
  const [section, setSection] = useState(0)

  const scrollToSection = useCallback((index: number) => {
    if(index >= 0 && (index + 1 <= Object.keys(SECTIONS).length)) {
    const toTop = 100 * index
    setTop('-' + toTop + 'vh')
    setSection(index)
    }
  }, [])

  const [menuMap, setMenuMap] = useState<MenuMapType>(
      Object.entries(SECTIONS).map(([slug, component], i) => (
      [
        slug,
        createRef(),
        component,
        false,
        (index?: number) => scrollToSection(index ? index : i)
      ]
    ))
  )

  const [activeSection, setActiveSection] = useState(menuMap[0][0])

  const handleScroll = useCallback(debounce((_) => {
    setMenuMap(prev => {
      return prev.map(([label, ref, component, _, scrollFn], i) => {
        //const top = (ref?.current?.getBoundingClientRect().top || 0)
        //const isActive = top >= 0 && top < viewport.height
        //if(isActive) setActiveSection(label)
        return [label, ref, component, (i === section), scrollFn]
      })
    })
  }, 10), [viewport, section])

  useEffect(() => {
    // call on init to set active menu item
    handleScroll(null)
  }, [handleScroll])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true)
    return () => document.removeEventListener('scroll', handleScroll, true)
  }, [viewport, handleScroll])

  return (
    <>

      <Head>
        <title>Zac Miller - {activeSection}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteTemplate menuMap={menuMap}>
        <div className={styles.root}>
          <div className={styles.contentsContainer} style={{ top }}>
            {menuMap.map(([key, ref, component], index) => (
              <div className={styles.content} ref={ref} key={key}>
                <div>
                  {component}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SiteTemplate>

    </>

  )

}

export default InfoPage
