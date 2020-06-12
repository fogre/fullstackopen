import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const addVote = async ancdt => {
  const response = await axios.put(
    `${baseUrl}/${ancdt.id}`, { ...ancdt, votes: ancdt.votes+1 }
  )
  return response.data
}

const createNew = async content => {
  const response = await axios.post(baseUrl, { content, votes: 0 })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { addVote, createNew, getAll }