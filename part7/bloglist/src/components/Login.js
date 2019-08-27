import React from 'react'
import Notification from './Notifications'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/appReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = ({ store, removeReset }) => {
  const usernameHook = useField('text')
  const passwordHook = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: usernameHook.value,
        password: passwordHook.value
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      store.dispatch(setUser(user))
    } catch (error) {
      store.dispatch(setNotification(['wrong username or password', 'error']))
      setTimeout(() => {
        store.dispatch(setNotification([]))
      }, 5000)
    }
  }

  return (
    <div>
      <h1>
        log in to application
      </h1>
      <Notification message={store.getState().notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...removeReset(usernameHook)} />
        </div>
        <div>
          password
          <input {...removeReset(passwordHook)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
