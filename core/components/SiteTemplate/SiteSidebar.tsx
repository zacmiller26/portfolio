import React, { useCallback, useMemo } from 'react'

import { useAuth } from '../../contexts/authUser'
import SiteMenu from './SiteMenu'
import ThemeBar from './ThemeBar'
import styles from './SiteSidebar.module.sass'


interface Props {}

const SiteSidebar: React.FC<Props> = () => {

  const getAgeFromYear = useCallback((year: string) => {
    const ageDifMs = Date.now() - Number(year)
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - Number(year)).toString()
  }, [])

  const age = useMemo(() => {
    return getAgeFromYear(process.env.NEXT_PUBLIC_YEAR_OF_BIRTH || '1900')
  }, [])

  return (
    <aside className={styles.root}>

      <div className={styles.profilePic}>
        <div>
          {//<img src="/images/thumbnail.png" />
          }
        </div>
      </div>

      <div className={styles.profileTitle}>
        <h3>
          {process.env.NEXT_PUBLIC_FIRST_NAME}{' '}
          {process.env.NEXT_PUBLIC_LAST_NAME}
        </h3>
        <h2>
          <em>{age}</em> {process.env.NEXT_PUBLIC_LOCATION}
        </h2>
      </div>

      <div className={styles.main}>
          <div>
            <SiteMenu />
          </div>
          <div />
      </div>

      <div className={styles.footer}>
        <ThemeBar />
      </div>

    </aside>
  )
}

export default SiteSidebar
