import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {

  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = e => {
    dispatch(changeFilter(e.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter