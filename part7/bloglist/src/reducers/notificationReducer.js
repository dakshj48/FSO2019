export const setNotification = message => (
  {
    type: 'SET_NOT',
    data: message
  }
)

const notificationReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_NOT':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
