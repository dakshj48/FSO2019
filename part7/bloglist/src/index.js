import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleWare } from 'redux'
import appReducer from './reducers/appReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(appReducer, composeWithDevTools())

const renderApp = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
