import type { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.NEXT_PRIVATE_DICTIONARY_API_KEY

const fetchApi = async (url: string) => {
  return await fetch(url+`?key=${API_KEY}`).then(res => {
    if(res.ok) return res.json()
    const err = new Error('An error occurred')
    throw (err)
  })
  .then(json => json)
  .catch(_err => {})
}

const view = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const { word } = req.body
    const json = await fetchApi(
      'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word
    )
    if(json?.length >= 1 && json[0].shortdef?.length >= 1) {
      return res.status(200).json({ word, definition: json[0].shortdef[0] })
    } else {
      return res.status(200).json({ word, definition: null })
    }
  }
  return res.status(200).json({ error: 'Method not supported.' })
}

export default view
