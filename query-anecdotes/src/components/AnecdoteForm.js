import { useMutation, useQueryClient } from 'react-query'

import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      dispatch({type: 'SET', payload: `you created '${newAnecdote.content}'`})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000);
    },
    onError: () => {
      dispatch({type: 'SET', payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
