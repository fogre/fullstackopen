import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from './service/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(
    localStorage.getItem('library-user-token') 
      ? localStorage.getItem('library-user-token')
      : null 
  )
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(ALL_GENRES)

  const booksByGenre = (genre = null) => {
    if ()
  }

  const notify = error => {
    setMessage(error)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <Notify errorMessage={message} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token 
            ? <button onClick={()=> setPage('login')}>login</button>
            : <span>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => logOut()}>log out</button>
              </span>
        }
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        notify={notify}
      />

      <Books
        show={page === 'books'}
        genres={genres}
        result={books}
      />

      <LoginForm
        show={page === 'login'}
        notify={notify}
        setToken={setToken}
        setPage={setPage}
      />  

      <NewBook
        show={page === 'add'}
        notify={notify}
      />

    </div>
  )
}

export default App