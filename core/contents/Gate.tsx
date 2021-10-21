import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { throttle } from 'lodash'
import { motion } from "framer-motion"

import useViewportMeta from '../hooks/useViewportMeta'
import styles from './Gate.module.sass'

const TOFIXED = ( value: number | string, dp: number ) => {
  return +parseFloat(value.toString()).toFixed( dp );
}

const NORMALIZE = (
  val: number, 
  max: number,
  min: number, 
  newMax: number, 
  newMin: number
) => {
  return TOFIXED(newMin + (val - min) * (newMax - newMin) / (max - min), 2)
}

const MAX = 10


interface MouseCoordsType {
  x: number
  y: number
}

const Gate = () => {

  const { isMobile, viewport } = useViewportMeta()

  const [mouseCoords, setMouseCoords] = useState<MouseCoordsType>({ 
    x: -3.5, y: -1
  })

  const handleMouseMove = useCallback(throttle((e: MouseEvent) => {
    setMouseCoords({
      x: NORMALIZE(e.x, viewport.width, 0, MAX, -MAX),
      y: NORMALIZE(e.y, viewport.height, 0, MAX, -MAX)
    })
  }, 100), [isMobile])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div 
      className={styles.root}
      variants={{
          hidden: { opacity: 0, x: 0, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: 0 },
      }}
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit"
      transition={{ 
          type: 'linear',
          duration: 1
      }}
    >
      <div className={styles.mask} />
      <Link href="/about">
        <a className={styles.btn}>
            <span className={styles.box}>
              <BoxSimulacrums count={38} mouseCoords={mouseCoords} />
              <span className={styles.name}>
                <em className={styles.firstName}>
                  {process.env.NEXT_PUBLIC_FIRST_NAME}
                  </em>
                <em className={styles.lastName}>
                  {process.env.NEXT_PUBLIC_LAST_NAME}
                </em>
              </span>
            </span>
            <b className={styles.message}>
              {isMobile ? 'Tap' : 'Click'} to enter
            </b>
        </a>
      </Link>
    </motion.div>
  )

}

interface SimulacrumProps {
  count: number
  mouseCoords: MouseCoordsType
}

const BoxSimulacrums: React.FC<SimulacrumProps> = props => {

  const getRotateDegree = (index: number) => {
    const weight = 2
    const val = ((- props.mouseCoords.x) + (- props.mouseCoords.y)) / 5
    const multiply = val //props.mouseCoords.y
    const even = index % 2
    return (even ? weight + index : - (weight + index)) * multiply
  }

  const getOpacity = (index: number) => {
    const add = .75
    const multiply = 100 / props.count
    return (((index + add) * multiply) / (100))
  }

  const getScale = (index: number) => {
    const val = (- props.mouseCoords.x) + (- props.mouseCoords.y)
    return NORMALIZE(val, MAX, -MAX, 1.6, 1)
  }

  return (
    <>
      {[...Array(props.count)].map((_, index) => (
        <i 
          key={index} 
          className={styles.simulacrum} 
          style={{
            borderColor: index % 2 ? 'var(--accent)' : 'var(--accent-tertiary)',
            opacity: getOpacity(index),
            scale: getScale(index),
            transform: `
              rotate(${getRotateDegree(index)}deg) scale(${getScale(index)}
            `
          }}
        />
      ))}
    </>
  )
}

export default Gate
