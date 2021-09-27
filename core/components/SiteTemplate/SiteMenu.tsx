import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

//import HeartRate from '../../animations/HeartRate'
import Container from '../Container'
import styles from './SiteMenu.module.sass'


interface Props {}

const SiteMenu: React.FC<Props> = () => {

  const router = useRouter()

  return (
    <Container className={styles.root}>
      <div />
      <div>
        <div />
        <nav>
          <i /><i /><i /><i />
          <div>
            <Link href="/">
              <a data-active={router.asPath === '/about'}>About</a>
            </Link>
            <Link href="/">
              <a data-active={router.asPath === '/'}>Code Examples</a>
            </Link>
            <Link href="/">
              <a data-active={router.asPath === '/contact'}>Contact</a>
            </Link>
          </div>
        </nav>
        <div />
      </div>
      <div />
    </Container>
  )
}

export default SiteMenu
