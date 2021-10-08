import Bubble from '../components/Bubble'


const CodePage = () => {

  return (
    <>
      <Bubble>
        {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
      </Bubble>
      <Bubble>
        {process.env.NEXT_PUBLIC_CONTACT_PHONE}
      </Bubble>
      <Bubble>
        {process.env.NEXT_PUBLIC_IG_PROFILE}
      </Bubble>
      <Bubble>
        {process.env.NEXT_PUBLIC_GITHUB_PROFILE}
      </Bubble>
    </>

  )

}

export default CodePage
