export const changeFilter = (newFilter) => {
  return {
    type: 'CHANGE',
    data: newFilter
  }
}

const filterReducer = (state = '', action) => {
	switch (action.type) {
    case 'CHANGE':
      return action.data
    default:
      return state 
  }
}

export default filterReducer