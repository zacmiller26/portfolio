import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'

import useViewportMeta from '../core/hooks/useViewportMeta'
import styles from '../styles/pages/index.module.sass'


const IndexPage: NextPage = () => {

  const { viewport } = useViewportMeta()

  const [textShadow, setTextShadow] = useState('')
  const [textShadowTwo, setTextShadowTwo] = useState('')

  const handleMouseMove = useCallback(throttle((e) => {

    const normalize = (
      val: number, max: number, min: number, newMax: number, newMin: number
    ) => {
      return newMin + (val - min) * (newMax - newMin) / (max - min)
    }

    const max = 9

    let x = normalize(e.x, viewport.width, 0, max, - max)
    let y = normalize(e.y, viewport.height, 0, max, - max)
    let iX = (- x)
    let iY = (- y)

    setTextShadow(`${iX}px ${iY}px 1px`)
    setTextShadowTwo(`${x}px ${y}px 1px`)

  }, 20), [viewport])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <>
      <Head>
        <title>Zac Miller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/info">
        <a className={styles.link}>
          <span style={{ textShadow: `${textShadow} var(--accent)` }}>
            {process.env.NEXT_PUBLIC_FIRST_NAME}
          </span>
          <em style={{ textShadow: `${textShadowTwo} var(--text-normal)` }}>
            {process.env.NEXT_PUBLIC_LAST_NAME}
          </em>
        </a>
      </Link>
    </>

  )

}

export default IndexPage
