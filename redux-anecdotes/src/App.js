import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Route, Link, Switch, useRouteMatch
} from 'react-router-dom'
import { initialize } from './reducers/anecdoteReducer'
import Anecdote from './components/Anecdote'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const About = () => (
  <div>
    <br />
    Anecdote redux & router app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -web development</a>.
  </div>
)

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialize())
  },[dispatch])

  const anecdotes = useSelector(({filter, anecdotes}) => {
    if (!filter)
     return anecdotes.sort((a,b) => b.votes - a.votes)
    const filtered = anecdotes.filter(a =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
    return filtered.sort((a,b) => b.votes - a.votes)
  })

  const match = useRouteMatch('/anecdotes/:id')
  const anec = match 
    ? anecdotes.find(a => a.id === match.params.id) 
    : null

  return (
    <div>
      <Menu />
      <Notification />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anec} />
        </Route>  
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <AnecdoteForm />
        </Route>
        <Route path='/'>
         <AnecdoteList anecdotes={anecdotes} />
        </Route> 
      </Switch>
    </div>
  )
}

export default App