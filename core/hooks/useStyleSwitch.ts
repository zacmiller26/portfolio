import { useMemo } from "react"

import useViewportMeta from './useViewportMeta'


interface Props {
  stylesDesktop: any
  stylesMobile: any
}

export const useStyleSwitch = (props: Props) => {

  const { isMobile } = useViewportMeta()

  return useMemo(() => {
    if(isMobile) return props.stylesMobile
    return props.stylesDesktop
  }, [isMobile, props])

}

export default useStyleSwitch
