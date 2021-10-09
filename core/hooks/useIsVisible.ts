import { useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  forwardedRef?: any
  threshold?: number
}

export default function useIsElemVisible(props: Props) {

  const [isVisible, setIsVisible] = useState(false)
  const elRef = useRef<any>(null)

  const intersectionObserverSupported = useMemo(() => {
    //if(typeof document === 'undefined')
    if (typeof document !== 'undefined' &&
      !('IntersectionObserver' in window) &&
      !('IntersectionObserverEntry' in window) &&
      !('intersectionRatio' in window.IntersectionObserverEntry.prototype))
    {
      return false
    }
    return true
  }, [])

  const ref = useMemo(() => {
    if(props.forwardedRef) return props.forwardedRef
    return elRef
  }, [elRef, props.forwardedRef])

  const observer = () => {
    if(!intersectionObserverSupported) return null
    return new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      }, { threshold: props.threshold, }
    )
  }

  useEffect(() => {
    const ob = observer()
    if(ob && ref && ref.current) {
      ob.observe(ref.current)
      return () => ob.disconnect()
    }
  }, [])

  return {
    isVisible,
    ref
  }
}
