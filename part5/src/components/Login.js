import React from 'react'
import Notification from './Notifications'
import { useField } from '../hooks/index'

const Login = ({
  handleLogin, setUsername, setPassword,
  notification, removeReset
}) => {
  const usernameHook = useField('text')
  const passwordHook = useField('password')

  setUsername(usernameHook.value)
  setPassword(passwordHook.value)

  return (
    <div>
      <h1>
        log in to application
      </h1>
      <Notification message={notification} />
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
