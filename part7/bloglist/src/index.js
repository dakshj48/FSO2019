import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import appReducer from './reducers/appReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter as Router } from 'react-router-dom';

const reducer = combineReducers({
  app: appReducer,
  notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools())

const renderApp = () => {
  ReactDOM.render(
    <Router>
      <App store={store}/>
    </Router>,
    document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
