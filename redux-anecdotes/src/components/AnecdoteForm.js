import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotif } from '../reducers/notificationReducer'
import { useField } from '../hooks/customHooks'

const AnecdoteForm = () => {

	const dispatch = useDispatch()
  const history = useHistory()

  const addAnecdote = e => {
  	e.preventDefault()
  	const content = e.target.anecdote.value
  	e.target.anecdote.value = ''
  	dispatch(newAnecdote(content))
    dispatch(showNotif(`you added ${content}`, 5))
    history.push('/')
  }
 
  return (
  	<div>
  	  <h2>Add anecdote</h2>
	    <form onSubmit={addAnecdote}>
	      <div><input name='anecdote' /></div>
	      <button type='submit'>create</button>
	    </form>
  	</div>
  )	
}

export default AnecdoteForm