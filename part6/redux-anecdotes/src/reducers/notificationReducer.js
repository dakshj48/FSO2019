const initialState = {
  message: ''
}

export const addNotification = (content) => {
  return {
    type: 'SETNOT',
    data: {
      message: content
    }
  }
}

export const remNotification = () => {
  return {
    type: 'REMNOT'
  }
}

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(remNotification())
    }, time)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SETNOT':
      return {...state, message: action.data.message}
    case 'REMNOT':
      return {...state, message: ''}
    default:
      return state
  }
}

export default notificationReducer
