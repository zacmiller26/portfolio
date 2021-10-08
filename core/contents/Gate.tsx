import { useCallback, useEffect, useState } from 'react'
import { throttle } from 'lodash'

import useViewportMeta from '../hooks/useViewportMeta'
import styles from './Gate.module.sass'


const Gate = ({ close, visible }: { close: Function, visible: boolean }) => {

  const { viewport } = useViewportMeta()

  const [textShadow, setTextShadow] = useState('')
  const [textShadowTwo, setTextShadowTwo] = useState('')

  const handleMouseMove = useCallback(throttle((e) => {

    if(!visible) return

    const normalize = (
      val: number, max: number, min: number, newMax: number, newMin: number
    ) => {
      return newMin + (val - min) * (newMax - newMin) / (max - min)
    }

    const max = 8

    let x = normalize(e.x, viewport.width, 0, max, - max)
    let y = normalize(e.y, viewport.height, 0, max, - max)
    let iX = (- x)
    let iY = (- y)

    setTextShadow(`${iX}px ${iY}px 1px`)
    setTextShadowTwo(`${x}px ${y}px 1px`)

  }, 20), [viewport, visible])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <button
      onClick={() => close()}
      className={styles.btn}
      data-visible={visible}
      type="button"
    >
      <i>
        <span style={{ textShadow: `${textShadowTwo} rgba(var(--accent-rgb), .25)` }}>
          {process.env.NEXT_PUBLIC_FIRST_NAME}
        </span>
        <em style={{ textShadow: `${textShadow} rgba(var(--accent-rgb), .25)` }}>
          {process.env.NEXT_PUBLIC_LAST_NAME}
        </em>
      </i>
      <a className={styles.link}>
        <span style={{ textShadow: `${textShadow} var(--accent)` }}>
          {process.env.NEXT_PUBLIC_FIRST_NAME}
        </span>
        <em style={{ textShadow: `${textShadowTwo} var(--text-normal)` }}>
          {process.env.NEXT_PUBLIC_LAST_NAME}
        </em>
      </a>
    </button>
  )

}

export default Gate
