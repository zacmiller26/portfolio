import React, { useCallback, useState } from 'react'

import ApiTemplate from '../ApiTemplate/ApiTemplate'
import Input from '../formComponents/Input'
import useApi from '../../hooks/useApi'
import SubmitBtn from '../formComponents/SubmitBtn'

interface Props {}

const ApiRegex: React.FC<Props> = () => {

  const [word, setWord] = useState('')

  const { result, isLoading, errors, apiCall } = useApi()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('word', word)
    const url = 'http://localhost:8000/v1/code-samples/regex/'
    apiCall(url, formData, 'POST')
  }, [word, apiCall])

  return (
    <ApiTemplate isLoading={isLoading} apiResponse={result}>
      <form onSubmit={handleSubmit}>
        <Input
          name={'test'}
          id="id_test"
          type="text"
          value={word}
          placeholder="search a word.."
          onChange={(e) => setWord(e.currentTarget.value)}
        />
        <SubmitBtn
          disabled={word === ''}
          text="Search"
          isLoading={isLoading}
        />
      </form>
    </ApiTemplate>
  )

}

export default ApiRegex