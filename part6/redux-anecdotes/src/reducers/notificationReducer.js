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

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SETNOT':
      state.message = action.data.message
      return state
    case 'REMNOT':
      state.message = ''
      return state
    default:
      return state
  }
}

export default notificationReducer
