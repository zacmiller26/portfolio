import React, { useCallback, useState } from 'react'

import Error from '../formComponents/Error'
import Input from '../formComponents/Input'
import SubmitBtn from '../formComponents/SubmitBtn'
import { useAuth } from '../../contexts/authUser'


interface Props {

}

const RegisterForm: React.FC<Props> = () => {

  const {
    createUser,
    shallowPageReload,
    loading
  } = useAuth()

  const [email, setEmail] = useState("")
  const [passwordOne, setPasswordOne] = useState("")
  const [passwordTwo, setPasswordTwo] = useState("")

  const [error, setError] = useState<null | string>(null)

  const handleSubmit = useCallback((e: any) => {
    e.preventDefault()
    setError(null)
    //check if passwords match. If they do, create user in Firebase
    // and redirect to your logged in page.
    if (passwordOne === passwordTwo && createUser) {

      const onSuccess = () => {
        if(shallowPageReload) shallowPageReload()
      }

      createUser(email, passwordOne, onSuccess, setError)

    }
    else
      setError("Passwords do not match")
  }, [email, passwordOne, passwordTwo])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="id_signUpEmail"
        name="email"
        placeholder="Email"
        autoComplete="email"
        required={true}
        focusOnInit={true}
      />
      <Input
        type="password"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        id="id_signUpPassword1"
        name="new-password"
        placeholder="Password"
        autoComplete="new-password"
        required={true}
      />
      <Input
        type="password"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        id="id_signUpPassword2"
        name="new-password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        required={true}
        helpText={
          passwordTwo && (passwordTwo !== passwordOne) ?
          'Passwords must match'
          :
          undefined
        }
      />
      <div>
        <Error>{error}</Error>
        <SubmitBtn
          text="Create Account"
          disabled={(passwordOne.length <= 2 || passwordOne !== passwordTwo)}
          isLoading={loading}
          isLoadingVerb="Creating"
        />
      </div>
    </form>
  )
}

export default RegisterForm
