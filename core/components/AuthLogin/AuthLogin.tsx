import React, { useState} from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import UserSVG from '../../vectors/User'
import { useAuth } from '../../contexts/authUser'
import styles from './AuthLogin.module.sass'


interface Props {}

const AuthLogin: React.FC<Props> = () => {

  const { authUser } = useAuth()

  const [section, setSection] = useState('register')

  return authUser ? <AuthLogOut /> : (
    <div className={styles.root}>

      <div className={styles.toggleMenu}>
        <button
          type="button"
          onClick={() => setSection('register')}
          data-active={section === 'register'}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => setSection('login')}
          data-active={section === 'login'}
        >
          Login
        </button>
      </div>

      <div className={styles.content}>
        {section === 'login' && <LoginForm />}
        {section === 'register' && <RegisterForm />}
      </div>

    </div>
  )

}

const AuthLogOut: React.FC<{}> = () => {

  const { authUser, signOut } = useAuth()

  return (
    <div className={styles.loggedIn}>

      <h3>You are signed in!</h3>

      <div><UserSVG /> {authUser.email}</div>

      <p>This session is persistant, you can navigate around or close this tab,
        and next time you come back, you'll see that you are still logged in.
      </p>

      <i><img src="/images/magic.gif" /></i>

      <button type="button" onClick={signOut}>
        Logout
      </button>

    </div>
  )

}

export default AuthLogin
