import { useState, useEffect } from 'react'
import { debounce } from 'lodash'
import { useCssProperties } from './useCssProperties'

const IS_CLIENT = typeof window !== 'undefined'

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height
    }
  }
  return {height: 0, width: 0}
}

export default function useViewportMeta() {

  const { mobileMaxWidth } = useCssProperties(['mobileMaxWidth'])
  const [isMobile, setIsMobile] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  const [browserTabIsActive, setBrowserTabIsActive] = useState(true)

  useEffect(() => {
    // update window dimensions on resize
    const handleResize = debounce(() => {
      setWindowDimensions(getWindowDimensions())
    }, 100)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // keep isMobile boolean updated
    setIsMobile(mobileMaxWidth >= windowDimensions.width)
  }, [mobileMaxWidth, windowDimensions])

  useEffect(() => {
    // give DOM a chance to render
    const timeout = setTimeout(() => {
      setIsMobile(mobileMaxWidth >= windowDimensions.width)
    }, 200)
    return () => clearTimeout(timeout)
  }, [mobileMaxWidth, windowDimensions])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setBrowserTabIsActive((document.visibilityState === 'visible'))
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }

  }, [])

  return {
    viewport: windowDimensions,
    isClientSide: IS_CLIENT,
    isMobile,
    browserTabIsActive
  }

}
