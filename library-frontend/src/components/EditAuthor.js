import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';
import { EDIT_AUTHOR } from '../service/queries'

const EditAuthor = ({ authors, notify }) => {
  const [name, setName] = useState(null)
  const [yearBorn, setYearBorn] = useState(null)
  const options = authors.map(a => { return { value: a.name, label: a.name }})
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      notify(error.message)
    }
  }) 

  const handleSelect = option => {
    setName(option.label)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    editAuthor({ variables: { name, setBornTo: yearBorn } })
  }

  const handleYearBorn = val => {
    const year = parseInt(val)
    if (isNaN(year)) return
    setYearBorn(year)
  }
  
  return(
    <div>
      <h2>Edit author</h2>
      <form onSubmit={handleSubmit}>
        <Select
          value={name}
          onChange={handleSelect}
          options={options}
        />
        <input 
          type='number'
          onChange={({ target }) => handleYearBorn(target.value)}
        />
        <br/>
        <button type='submit'>edit author</button>
      </form>  
    </div>
  )
}

export default EditAuthor