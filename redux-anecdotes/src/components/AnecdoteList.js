import React from 'react'
import { Link } from 'react-router-dom'
import Anecdote from './Anecdote'
import Filter from './Filter'

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>view</Link>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
          />
        </div>  
      )}
    </div>    
  )
}

export default AnecdoteList
