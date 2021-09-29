import { useRef, useEffect } from "react"

export function useDomEl() {

  const domEl = useRef<HTMLElement>(document.createElement('div'))

  useEffect(() => {
    document.body.append(domEl.current)
    return () => domEl.current.remove()
  }, [domEl])

  return domEl

}
