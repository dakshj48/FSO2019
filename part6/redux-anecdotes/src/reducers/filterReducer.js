const initialState = ''

export const toFilter = (term) => {
  return {
    type: 'FILTER',
    data: {
      filter: term
    }
  }
}

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FILTER':
      state = action.data.filter
      return state
    default:
      return state
  }
}

export default filterReducer
