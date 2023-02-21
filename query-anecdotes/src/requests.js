import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const compareVotes = (a, b) => b.votes - a.votes

export const getAnecdotes = () => 
  axios.get(baseUrl).then(res => res.data.sort(compareVotes))

export const createAnecdote = (newAnecdote) => {
  return axios
    .post(baseUrl, newAnecdote)
    .then(res => res.data)
    .catch(error => {
      throw new Error('too short anecdote, must have length 5 or more')
    })
}

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)