import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const compareVotes = (a,b) => b.votes - a.votes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat(action.payload).sort(compareVotes)
    },
    updateAnecdote(state, action) {
      return state.map((s) => s.id !== action.payload.id ? s : action.payload).sort(compareVotes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort(compareVotes)
    }
  },
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.vote(id)
    dispatch(updateAnecdote(anecdote))
    return anecdote
  }
}

export default anecdoteSlice.reducer