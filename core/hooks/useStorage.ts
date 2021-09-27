import { useCallback, useState, useMemo, useEffect } from "react"

const IS_CLIENT = typeof window !== 'undefined'

export function useLocalStorage(key: string, defaultValue: any) {

  const storageObject = useMemo(() => {
    if(typeof window !== 'undefined') return window.localStorage
    return Object
  }, [])

  return useStorage(key, defaultValue, storageObject)

}

export function useSessionStorage(key: string, defaultValue: any) {

  const storageObject = useMemo(() => {
    if(typeof window !== 'undefined') return window.sessionStorage
    return Object
  }, [])

  return useStorage(key, defaultValue, storageObject)
}

function useStorage(key: string, defaultValue: any, storageObject: any) {

  const [value, setValue] = useState((prev: any) => {

    const jsonValue = IS_CLIENT ? storageObject.getItem(key) : null
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof prev === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }

  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]

}
