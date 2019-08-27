import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleWare } from 'redux'
import appReducer from './reducers/appReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  app: appReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools())

const renderApp = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
