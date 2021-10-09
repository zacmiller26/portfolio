import React, {
  createContext, useEffect, useContext, useMemo
} from 'react'

import { useLocalStorage } from '../hooks/useStorage'
import { useCssProperties} from '../hooks/useCssProperties'

export interface ThemeOptionsType {
  [key: string]: string | null
}

const siteThemeContext = createContext<Partial<any>>({})

const THEME_OPTIONS = ['dark', 'purple', 'blue']
const ACCENT_OPTIONS = ['blue', 'green', 'orange', 'purple', 'ruby']

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {

  const [accent, setAccent] = useLocalStorage("site_accent", ACCENT_OPTIONS[0])
  const [theme, setTheme] = useLocalStorage("site_theme", THEME_OPTIONS[0])

  const cssProperties = useCssProperties([
    ...THEME_OPTIONS.map(o => `theme-${o}`),
    ...ACCENT_OPTIONS.map(a => `accent-${a}`)
  ])

  const accentOptions = useMemo(() : ThemeOptionsType => {
    let options: ThemeOptionsType = {}
    ACCENT_OPTIONS.forEach((key) => {
      options[key] = cssProperties[`accent-${key}`]?.toString() || null
    })
    return options
  }, [accent, cssProperties])

  const themeOptions = useMemo(() : ThemeOptionsType => {
    let options: ThemeOptionsType = {}
    THEME_OPTIONS.forEach((key) => {
      options[key] = cssProperties[`theme-${key}`]?.toString() || null
    })
    return options
  }, [theme, cssProperties])

  useEffect(() => {
    if(THEME_OPTIONS.includes(theme)) {
      document.documentElement?.setAttribute("data-theme", theme)
    } else {
      document.documentElement?.setAttribute("data-theme", THEME_OPTIONS[0])
    }
  }, [theme])

  useEffect(() => {
    if(ACCENT_OPTIONS.includes(accent)) {
      document.documentElement?.setAttribute("data-accent", accent)
    } else {
      document.documentElement?.setAttribute("data-accent", ACCENT_OPTIONS[0])
    }
  }, [accent])

  const returnValues = {
    accent,
    accentOptions,
    theme,
    themeOptions,
    setAccent,
    setTheme
  }

  return (
    <siteThemeContext.Provider value={returnValues}>
      {children}
    </siteThemeContext.Provider>
  )

}

export const useSiteTheme = () => useContext(siteThemeContext)
