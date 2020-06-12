let timeoutID = null

export const showNotif = (content, time) => {
  return async dispatch => {
    dispatch({ type: 'SHOW_NOTIF', data: content })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = await setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIF' })
    }, time*1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'HIDE_NOTIF':
      timeoutID = null
      return ''
    case 'SHOW_NOTIF':
      return action.data  
    default:
      return state
  }
}
export default notificationReducer