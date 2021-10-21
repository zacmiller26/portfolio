import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import useViewportMeta from '../../hooks/useViewportMeta'
import CodeSVG from '../../vectors/Code'
import HomeSVG from '../../vectors/Home'
import PhoneSVG from '../../vectors/Phone'
import UserSVG from '../../vectors/User'
import Container from '../Container'
import siteConfig from '../../../site-config.json'
import styles from './SiteMenu.module.sass'


interface Props {}

const SiteMenu: React.FC<Props> = props => {

  const { isMobile } = useViewportMeta()
  const router = useRouter()

  return isMobile ? <MobileSiteMenu {...props} /> : (
    <Container className={styles.root}>
      <motion.div 
        className={styles.animation}
        variants={{
            hidden: { opacity: 0 },
            enter: { opacity: 1 },
        }}
        initial="hidden"
        animate="enter" 
        transition={{ 
            type: 'linear',
            duration: .25
        }}
       >
        {Object.entries(siteConfig.urls).map(([label, path]) => (
          <Link href={path} key={path}>
            <a data-active={router.asPath === path}>
              {label}
            </a>
        </Link>
        ))}
      </motion.div>
    </Container>
  )

}

const MobileSiteMenu: React.FC<Props> = () => {

  const router = useRouter()

  return (
    <div className={styles.mobileRoot}>

      <Link href="/">
        <a>
          <HomeSVG />
        </a>
      </Link>

      {Object.entries(siteConfig.urls).map(([_, path]) => (
        <Link href={path} key={path}>
          <a data-active={router.asPath === path}>
            {path.includes('about') ?
              <UserSVG />
            : path.includes('contact') ?
              <PhoneSVG />
            :
              <CodeSVG />
            }
          </a>
      </Link>
      ))}

    </div>
  )
}

export default SiteMenu
