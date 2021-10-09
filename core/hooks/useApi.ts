import { useCallback, useState } from 'react'

import useToggle from './useToggle'

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
}

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
    url: string, formData: FormData, method: "POST" | "PUT") => {

    clear()
    toggleIsLoading(true)

    var newObj: {[key: string]: any} = {}
    formData.forEach(function(value, key){
        newObj[key] = value
    })
    const body = JSON.stringify(newObj);

    await fetch(url, { method, body, headers: DEFAULT_HEADERS })
      .then((res) => {
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
