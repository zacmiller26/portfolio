import { useCallback, useState } from 'react'

import useToggle from './useToggle'

export default function useApi() {

  const [result, setResult] = useState<null | Object>(null)
  const [errors, setErrors] = useState<null | string>(null)
  const [isLoading, toggleIsLoading] = useToggle(false)

  const clear = useCallback(() => {
    toggleIsLoading(false)
    setResult(null)
    setErrors(null)
  }, [])

  const apiCall = useCallback(async (
    url: string, body: FormData, method: "POST" | "PUT") => {

    clear()
    toggleIsLoading(true)

    await fetch(url, { method, body })
      .then((res) => {
        console.log(res)
        if (res.ok) return res.json()
        throw new Error('Something went wrong')
      })
      .then((responseJson) => { setResult(responseJson) })
      .catch((error) => { setErrors(error.toString()) })

    toggleIsLoading(false)
    return true

  }, [])

  return {
    apiCall,
    isLoading,
    result,
    errors,
  }

}
