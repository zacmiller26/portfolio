import { useMemo } from "react"

type Props = string[]

interface CssProperties {
  [key: string]: string | number
}

export const useCssProperties = (props: Props) : CssProperties => {

  return useMemo(() => {
    if (process.browser) {
      const appMount = document.documentElement
      if(appMount) {
        const style = getComputedStyle(appMount)
        let cssProperties: CssProperties = {}
        props.forEach((key) => {
          let val: string | number = style.getPropertyValue(`--${key}`).trim()
          if(val.includes('px')) {
            val = Number(val.replace('px', ''))
          }
          cssProperties[key] = val
        })
        return cssProperties
      }
    }
    return {}
  }, [props, process.browser])

}
