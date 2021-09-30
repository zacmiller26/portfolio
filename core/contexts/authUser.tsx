import React, {
  createContext, useCallback, useContext, useEffect, useState
} from 'react'

import app from '../lib/firebase.config'

import {
  getAuth,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User
} from "firebase/auth"
import { useRouter } from 'next/router'

const authUserContext = createContext<Partial<any>>({})

/* TODO: fix this */
const auth = app ? getAuth() : null

export interface FirebaseAuthUserType {
  displayName: string | null
  uid: string
  email: string | null
  username: string | null
}

const formatAuthUser = (user: User) : FirebaseAuthUserType => ({
  uid: user.uid,
  email: user.email,
  displayName: user?.displayName || null,
  username: user?.displayName || user.email
})

export function AuthUserProvider({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const [authUser, setAuthUser] = useState<null | FirebaseAuthUserType>(null)
  const [isLoading, setIsLoading] = useState(true)

  // clear states
  const clear = useCallback(() => {
    setAuthUser(null)
    setIsLoading(true)
  }, [])

  // sign in user
  const signIn = useCallback(async (
      email: string,
      password: string,
      onSuccess?: Function,
      setError?: Function
    ) => {

    setIsLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then(_ => { setIsLoading(false); onSuccess && onSuccess() })
      .catch(err => { setIsLoading(false);  setError && setError(err.message)})
    setIsLoading(false)

  }, [])

  // create new user
  const createUser = useCallback(async (
      email: string,
      pw: string,
      onSuccess?: Function,
      setError?: Function
  ) => {

    setIsLoading(true)
    await createUserWithEmailAndPassword(auth, email, pw)
      .then(_ => { setIsLoading(false); onSuccess && onSuccess() })
      .catch(err => { setIsLoading(false); setError && setError(err.message)})

  }, [])

  // reauthenticate currentUser
  const reauthenticateAuthUser = useCallback(async (
    email: string,
    password: string,
    onSuccess?: Function,
    setError?: Function
  ) => {

    const credential = EmailAuthProvider.credential(email, password)
    const { currentUser } = auth
    if(currentUser) {
      return reauthenticateWithCredential(currentUser, credential)
        .then(_ => onSuccess && onSuccess())
        .catch(err => setError && setError(err.message))
    }
    return false

  }, [])

  const signOut = useCallback(() => auth.signOut().then(clear), [])

  const sendEmailVerificationLink = useCallback(async () => {
    const { currentUser } = auth
    return currentUser && sendEmailVerification(currentUser)
  }, [])

  const sendEmailPasswordResetLink = useCallback(async (
    email: string,
    onSuccess?: Function,
    setError?: Function
  ) => {
    return await sendPasswordResetEmail(auth, email)
    .then(() => {
        onSuccess && onSuccess()
      })
      .catch((error) => {
        //var errorCode = error.code
        setError && setError(error.message.toString())
      })
  }, [])

  // whenever authUser changes, use this callback to update state
  const onAuthUserChange = useCallback(async (authState: User | null) => {

    if (!authState) {
      setAuthUser(null)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      var formattedUser = formatAuthUser(authState)
      setAuthUser(formattedUser)
      setIsLoading(false)
    }

  }, [])

  // manually refresh current user data from Firebase
  const reloadAuthUser = useCallback(() => {
    const { currentUser } = auth
    currentUser?.reload()
      .then(() => onAuthUserChange(currentUser))
  }, [])

  const shallowPageReload = useCallback(() => {
    router.push(router.pathname, router.asPath, { shallow: true })
  }, [router.pathname, router.asPath])

  // listen for Firebase auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthUserChange)
    return () => unsubscribe()
  }, [])

  const returnValue = {
    authUser,
    createUser,
    isLoading,
    reauthenticateAuthUser,
    reloadAuthUser,
    sendEmailVerificationLink,
    sendEmailPasswordResetLink,
    sendPasswordResetEmail,
    shallowPageReload,
    signIn,
    signOut
  }

  return (
    <authUserContext.Provider value={returnValue}>
      {children}
    </authUserContext.Provider>
  )

}

export const useAuth = () => useContext(authUserContext)
