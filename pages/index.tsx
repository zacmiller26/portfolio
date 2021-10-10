import type { NextPage } from 'next'
import Head from 'next/head'
import { createRef, useCallback, useEffect, useMemo, useState } from 'react'

import Gate from '../core/contents/Gate'
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
  (i?: number) => void, // scroll to component
  () => void // return home
][]

const SECTIONS = {
  About: <About />,
  'Code Examples': <Examples />,
  Contact: <Contact />
}

const IndexPage: NextPage = () => {

  const [top, setTop] = useState<undefined | string>(undefined)
  const [section, setSection] = useState(0)
  const [gated, setGated] = useState(true)

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
        (index?: number) => scrollToSection(index ? index : i),
        () => setGated(true)
      ]
    ))
  )

  const activeSection = useMemo(() => menuMap[section], [section, menuMap])

  useEffect(() => {
    setMenuMap(prev => {
      return prev.map((arr, i) => {
        let newItem = arr
        newItem[3] = i === section
        return newItem
      })
    })
  }, [section])

  useEffect(() => {
    if(gated) {
      setTop(undefined)
      setSection(0)
    }
  }, [gated])

  return (
    <>
    
      <Head>
        <title>Zac Miller{gated ? '' : ` - ${activeSection[0]}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteTemplate menuMap={menuMap} goHome={() => setGated(true)}>
        <div className={styles.root}>
          <div className={styles.contentsContainer} style={{ top }}>
            {menuMap.map(([key, ref, component]) => (
              <div className={styles.content} ref={ref} key={key}>
                <div>
                  {component}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SiteTemplate>

      <Gate close={() => setGated(false)} visible={gated} />

    </>

  )

}

export default IndexPage
