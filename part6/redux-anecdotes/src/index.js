import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import anecdotesService from './services/anecdotes'

const store = createStore(combineReducers({
  anecdotes: anecdoteReducer, 
  notification: notificationReducer,
  filter: filterReducer
}))

anecdotesService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
