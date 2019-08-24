const initialState = {
  message: ''
}

export const addNotification = content => ({
  type: 'SETNOT',
  data: {
    message: content
  }
})

export const remNotification = () => ({ 
  type: 'REMNOT'
})

export const setNotification = (content, time) => (
  async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(remNotification())
    }, time)
  }
)

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
