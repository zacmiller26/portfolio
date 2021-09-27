import { useEffect, useCallback } from 'react'


interface Props {
  forwardedRef: React.RefObject<Element> | null
  callback: Function
}

export default function useOuterClick(props: Props) {

  // if click outside of forwardedRef, call callback
  const handleClicks = useCallback((e: MouseEvent) => {
    if(e.target instanceof HTMLElement && props.forwardedRef && props.forwardedRef.current) {
      if(!props.forwardedRef.current.contains(e.target)) {
        props.callback()
      }
    }
  }, [props.callback, props.forwardedRef])

  // activate & cleanup event listeners
  useEffect(() => {
    window.addEventListener('click', handleClicks)
    return () => window.removeEventListener('click', handleClicks)
  }, [handleClicks])

  return {}

}
