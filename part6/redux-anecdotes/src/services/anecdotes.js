import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async id => {
  const anecdotes = await axios.get(baseUrl)
  const toModify = anecdotes.data.find(anecdote => anecdote.id === id)
  await axios.put(`${baseUrl}/${id}`,
    {...toModify, votes: toModify.votes += 1}
  )
}

export default { getAll, createNew, vote }
