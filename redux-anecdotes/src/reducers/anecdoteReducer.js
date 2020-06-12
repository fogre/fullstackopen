import anecdoteService from '../services/anecdotes'

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecdotes
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC', 
      data: newAnec
    })
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const updated = await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE',
      data: updated
    })
  }
  
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANEC': 
      return state.concat(action.data)
    case 'INIT_ANECS':
      return action.data
    case 'VOTE':
      return state.map(anec => 
        anec.id !== action.data.id ? anec : action.data
      )
    default:
      return state
  }
}
export default anecdoteReducer