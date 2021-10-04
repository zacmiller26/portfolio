import React, { useCallback, useEffect, useState } from 'react'

import ApiTemplate from '../ApiTemplate/ApiTemplate'
import useApi from '../../hooks/useApi'
import SubmitBtn from '../formComponents/SubmitBtn'

interface Props {}

const ApiVote: React.FC<Props> = () => {

  const [vote, setVote] = useState<null | boolean>(null)

  const { result, isLoading, errors, apiCall } = useApi()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('vote', vote ? '1' : '0')
    const url = 'http://localhost:8000/v1/code-samples/vote/'
    apiCall(url, formData, 'POST')
  }, [vote, apiCall])

  return (
    <ApiTemplate isLoading={isLoading} apiResponse={result}>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => setVote(false)}>
          I vote no!
        </button>
        <button type="button" onClick={() => setVote(true)}>
          I vote yes!
        </button>
        <SubmitBtn
          disabled={vote === null}
          text="Search"
          isLoading={isLoading}
        />
      </form>
    </ApiTemplate>
  )

}

export default ApiVote
