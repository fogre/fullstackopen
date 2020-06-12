import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from '../service/queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS }, {query: ALL_AUTHORS } ],
    onError: (error) => {
      props.notify(error.message)    
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await createBook({
      variables: { title, author, published, genres }
    })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }


  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const handlePublished = val => {
    const publishedInt = parseInt(val)
    if (isNaN(publishedInt))
      props.notify('published needs to be a year as a number')
    setPublished(publishedInt)
  }
  console.log(author)
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            min="0"
            step="1"
            value={published}
            onChange={({ target }) => handlePublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook