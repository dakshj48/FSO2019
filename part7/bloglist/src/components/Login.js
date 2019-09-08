import React from 'react'
import Notification from './Notifications'
import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/appReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Input, Icon } from 'semantic-ui-react'

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
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username</label>
          <Input {...removeReset(usernameHook)} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <Input {...removeReset(passwordHook)} />
        </Form.Field>
        <Button primary animated>
          <Button.Content visible>login</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
      </Form>
    </div>
  )
}

export default Login
