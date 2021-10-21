import { useEffect } from 'react'

import useTimeout from './useTimeout'

export default function useDebounce(
    callback: Function, delay: number, dependencies: any[]) 
{

    const { clear, reset } = useTimeout(callback, delay)
    
    // any time dependencies change, reset timeout (clear prev & start new one)
    useEffect(() => {
        reset()
    }, [...dependencies, reset])

    // cancel initial useTimeout callback (dont call callback at first)
    useEffect(() => {
        clear()
    }, [])

}