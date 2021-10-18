import { useCallback, useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'

import useViewportMeta from '../hooks/useViewportMeta'
import styles from './Gate.module.sass'


const Gate = ({ close, visible }: { close: Function, visible: boolean }) => {

  const { isMobile, viewport } = useViewportMeta()

  const [textShadow, setTextShadow] = useState('-7.5px 5px 1px')
  const [textShadowTwo, setTextShadowTwo] = useState('7.5px -5px 1px')
  
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
    if(!visible) {
      setTextShadow('')
      setTextShadowTwo('')
    }
  }, [visible])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <>
      {visible && <div className={styles.mask} />}
      <button
        onClick={() => close()}
        className={styles.btn}
        data-visible={visible}
        type="button"
      >
        {[...Array(26)].map((_, index) => (
          <Simulacrum
            key={index}
            multiply={(index+1) * 2.75}
            blur={(index+1) * .5}
            shadow={textShadow}
            shadowTwo={textShadowTwo}
          />
        ))}
        <a className={styles.link}>
          <span style={{ 
            textShadow: `
              ${textShadowTwo} rgba(var(--background-secondary-rgb), .7)
            ` 
          }}>
            {process.env.NEXT_PUBLIC_FIRST_NAME}
          </span>
          <em style={{ 
            textShadow: `
              ${textShadow} rgba(var(--background-secondary-rgb), .7)
            ` 
          }}>
            {process.env.NEXT_PUBLIC_LAST_NAME}
          </em>
        </a>
        <b>{isMobile ? 'Tap' : 'Click'} to enter</b>
      </button>
    </>
  )

}

interface SProps {
  shadow: string
  shadowTwo: string
  multiply: number
  blur: number
}

const Simulacrum: React.FC<SProps> = props => {

  const { shadow, shadowTwo, multiply, blur } = props

  const multiplyShadow = useCallback((
    shadow: string, multiply: number, blur: number
  ) => {

    let coords: any = shadow.split('px')
    coords[0] = Number(coords[0]) * Number(multiply)
    coords[1] = Number(coords[1]) * Number(multiply)
    return `${coords[0]}px ${coords[1]}px ${Math.round(blur)}px`

  }, [])

  const spanShadow = useMemo(() => {
    return multiplyShadow(shadowTwo, multiply, blur)
  }, [shadowTwo, multiply, blur])

  const emShadow = useMemo(() => {
    return multiplyShadow(shadow, multiply, blur)
  }, [shadowTwo, multiply, blur])

  const opacity = useMemo(() => {
    return Math.round((100/multiply) / 1.1)
  }, [multiply])

  return (
    <i>
      <span style={{
        textShadow: `${spanShadow} rgba(var(--text-normal-rgb), .${opacity})`
      }}>
        {process.env.NEXT_PUBLIC_FIRST_NAME}
      </span>
      <em style={{
        textShadow: `${emShadow} rgba(var(--accent-rgb), .${opacity})`
      }}>
        {process.env.NEXT_PUBLIC_LAST_NAME}
      </em>
    </i>
  )
}

export default Gate
