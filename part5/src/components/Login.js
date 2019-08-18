import React from 'react'
import Notification from './Notifications'

const Login = ({ 
    handleLogin, username, password, 
    setUsername, setPassword, notification 
  }) => (
  <div>
    <h1>
      log in to application
    </h1>
    <Notification message={notification} />
    <form onSubmit={handleLogin}>
      <div>
        username
          <input type='text' value={username} name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input type='password' value={password} name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default Login
