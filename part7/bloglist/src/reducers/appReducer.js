const initialState = {
  blogs: [],
  user: null
}

export const setBlogs = blogs => (
  {
    type: 'SET_BLOGS',
    data: blogs
  }
)

export const setUser = user => (
  {
    type: 'SET_USER',
    data: user
  }
)

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.data }
    case 'SET_USER':
      return { ...state, user: action.data }
    default:
      return state
  }
}

export default appReducer
