import React, { useEffect, useMemo, useRef, useState } from 'react'

import useOuterClick from '../hooks/useOuterClick'
import useViewportMeta from '../hooks/useViewportMeta'
import styles from './Dropdown.module.sass'


type VerticalStyleType = { top: string | number } | { bottom: number | number } | {}

interface Props {
  children: React.ReactNode
  btnRef: React.RefObject<HTMLButtonElement | null>
  show: boolean
  close: Function
  className?: string
  xPosition?: 'left' | 'center'
}

const Dropdown: React.FC<Props> = ({xPosition = 'center', ...props}) => {
  /* Important to note: This will position itself (from the top) based on
  the nearest RELATIVE parent.
  */

  const simulacrumRef = useRef<HTMLDivElement | null>(null)
  const [leftPos, setLeftPos] = useState(0)
  const [width, setWidth] = useState<number | "inherit">("inherit")
  const [verticalStyle, setVerticalStyle] = useState<VerticalStyleType>({})
  const { isClientSide } = useViewportMeta()
  const [opacity, setOpacity] = useState(0)

  useOuterClick({
    forwardedRef: simulacrumRef,
    callback: props.show ? props.close : () => null
  })

  const btnHeight = useMemo(() => {
    if(props.btnRef && props.btnRef.current) {
      return props.btnRef.current.offsetHeight
    }
    return 0
    // dependency props.show isn't used perse, but influences this result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.btnRef, props.show])

  const btnWidth = useMemo(() => {
    if(props.btnRef && props.btnRef.current) {
      return props.btnRef.current.offsetWidth
    }
    return 0
    // dependency props.show isn't used perse, but influences this result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.btnRef, props.show])

  // set Y axis
  useEffect(() => {
    if(isClientSide && simulacrumRef && simulacrumRef.current &&
       props.btnRef && props.btnRef.current) {
        const simulacrumHeight = simulacrumRef.current.offsetHeight
        const rect = props.btnRef.current.getBoundingClientRect()
        const bottom = window.innerHeight - rect.bottom
        const bottomBuffer = 20 // extra cushim from bottom
        if((bottom - bottomBuffer) <= simulacrumHeight) {
          return setVerticalStyle({
            bottom: btnHeight
          })
        }
    }
    setVerticalStyle({ top: '100%' })
  }, [isClientSide, props.btnRef, btnHeight, simulacrumRef, setVerticalStyle,
      props.show])

  // set X axis
  useEffect(() => {
    if(simulacrumRef && simulacrumRef.current) {
      const simulacrumWidth = simulacrumRef.current.offsetWidth + 2
      let offset = 0;
      if(xPosition === 'center') {
        offset = ((btnWidth + 2) - simulacrumWidth) / 2
      }
      setLeftPos(offset)
      setWidth(simulacrumWidth)
    }
  }, [btnWidth, simulacrumRef, props.show, props.children, setLeftPos,
      xPosition])

  const className = useMemo(() => {
    let className = styles.dropdownWrapper
    if(props.className) className += ` ${props.className}`
    return className
  }, [props.className])

  const isShowable = useMemo(() => {
    if(leftPos !== 0 && xPosition !== 'left') return true
    else if (leftPos === 0 && xPosition === 'left') return true
    return false
  }, [leftPos, xPosition])

  useEffect(() => {
    if(props.show) {
      // delay opacity to allow time for proper positioning
      const timer = setTimeout(() => setOpacity(100), 50)
      return () => clearTimeout(timer)
    } else {
      setOpacity(0)
    }
  }, [props.show])

  return (
    <>
      {props.show && isShowable && <div className={styles.dropdown} style={{
        left: leftPos,
        width: width,
        opacity,
        ...verticalStyle
      }}>
        <div className={className}>
          {props.children}
        </div>
      </div>}
      <div
        className={`${styles.dropdownWrapper} ${styles.simulacrum}`}
        ref={simulacrumRef}
      >
          <div className={className}>
          {props.children}
          </div>
      </div>
    </>
  )
}

export default Dropdown
