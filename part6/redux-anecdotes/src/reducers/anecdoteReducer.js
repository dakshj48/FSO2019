import anecdoteService from '../services/anecdotes'

export const toVote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }
}

export const toAdd = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const toVote = state.find(a => a.id === id)
      const changedAnec = { ...toVote, votes: toVote.votes + 1 }
      return state.map(a => a.id === id ? changedAnec : a)
    case 'ADD':
      const toAdd = action.data
      return state.concat(toAdd)
    case 'INIT_NOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
