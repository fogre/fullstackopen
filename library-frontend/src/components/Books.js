import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_BY_GENRE } from '../service/queries'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  if (props.result.loading) return <div>loading..</div>

  const books = props.result.data.allBooks
  const genres = props.genres.data.allGenres

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => 
          <button key={genre}>{genre}</button>
        )}
        <button>all genres</button>
      </div>  
    </div>
  )
}

export default Books