import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotif(`you voted ${anecdote.content}`, 5))
  }

  return (
     <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
    </div>
  )
}

export default Anecdote