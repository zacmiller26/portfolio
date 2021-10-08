import React, { useCallback, useState } from 'react'

import Error from '../formComponents/Error'
import Input from '../formComponents/Input'
import SubmitBtn from '../formComponents/SubmitBtn'
import { useAuth } from '../../contexts/authUser'


interface Props {}

const LoginForm: React.FC<Props> = () => {

  const { authUser, signIn, loading, shallowPageReload } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = useCallback((e: React.FormEvent) => {

    e.preventDefault()
    setError(null)

    if(signIn) {

      const onSuccess = () => {
        setEmail("")
        setPassword("")
        if(shallowPageReload) shallowPageReload()
      }

      signIn(email, password, onSuccess, setError)
    }

  }, [email, password, signIn, shallowPageReload])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        id="email"
        placeholder="Email"
        autoComplete="current-email"
        required={true}
        focusOnInit={true}
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="Password"
        autoComplete="current-password"
        required={true}
      />
      <div>
        <Error>{error}</Error>
        <SubmitBtn
          disabled={(password.length <= 5 || email.length <= 3)}
          text={"Login"}
          isLoading={loading}
          isLoadingVerb="Logging in"
        />
      </div>
    </form>
  )

}

export default LoginForm
