import { useCallback } from 'react'

import EmailSVG from '../vectors/Email'
import PhoneSVG from '../vectors/Phone'
import LogoGithubSVG from '../vectors/LogoGithub'
import LogoInstaSVG from '../vectors/LogoInsta'


import styles from './Contact.module.sass'


const Contact = () => {

  const replaceAll = (string: string, search: string, replace: string) => {
    return string.split(search).join(replace)
  }

  const cleanStr = useCallback((str?: string) => {
    if(str) {
      let newStr = replaceAll(str, '(', '')
      newStr = replaceAll(newStr, ')', '')
      newStr = replaceAll(newStr, ' ', '')
      newStr = replaceAll(newStr, '-', '')
      return newStr
    }
  }, [])

  return (
    <ul className={styles.contactList}>
      <li>
        <EmailSVG />
        <a
          href={
            `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`+
            `?subject=Contacting you from your Portfolio Site`+
            `&body=Hey Zac, I think we should work together!`
          }>
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
        </a>
      </li>
      <li>
        <PhoneSVG />
        <a href={`tel:${cleanStr(process.env.NEXT_PUBLIC_CONTACT_PHONE)}`}>
          {process.env.NEXT_PUBLIC_CONTACT_PHONE}
        </a>
      </li>
      <li>
        <LogoInstaSVG />
        <a
          href={process.env.NEXT_PUBLIC_IG_PROFILE}
          target="_blank"
          rel="external nofollow noopener noreferrer"
        >
          {process.env.NEXT_PUBLIC_IG_PROFILE}
        </a>
      </li>
      <li>
        <LogoGithubSVG />
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_PROFILE}
          target="_blank"
          rel="external nofollow noopener noreferrer"
        >
          {process.env.NEXT_PUBLIC_GITHUB_PROFILE}
        </a>
      </li>
    </ul>

  )

}

export default Contact
