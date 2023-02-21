import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './contexts/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: false
  })

  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      dispatch({type: 'SET', payload: `you voted '${updatedAnecdote.content}'`})
      setTimeout(() => {
        dispatch({type: 'RESET'})
      }, 5000);
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const handleVote = (anecdote) => {
    const updateAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    voteAnecdoteMutation.mutate(updateAnecdote)
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
