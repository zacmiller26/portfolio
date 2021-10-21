import { useCallback, useEffect, useRef } from 'react'


export default function useTimeout(callback: Function, delay: number) {

    const callbackRef = useRef(callback)
    const timeoutRef = useRef<NodeJS.Timeout | undefined>()

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [callbackRef, delay])

    const reset = useCallback(() => {
        clear()
        set()
    }, [])

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        set()
        return clear
    }, [delay, set, clear])

    return {
        clear,
        reset
    }

}