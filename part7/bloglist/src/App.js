import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import { setBlogs, setUser } from './reducers/appReducer'

const App = (props) => {
  const store = props.store
  // const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a,b) => b.likes - a.likes)
        // setBlogs(initialBlogs)
        store.dispatch(setBlogs(initialBlogs))
      })
  }, [store])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [store])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      store.dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification(['wrong username or password', 'error'])
      setTimeout(() => {
        setNotification([])
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    store.dispatch(setUser(null))
  }

  const removeReset = (obj) => (({reset, ...others}) => ({...others}))(obj)

  return (
    <div>
      {store.getState().user === null &&
        <Login handleLogin={handleLogin} setUsername={setUsername}
          setPassword={setPassword} notification={notification}
          removeReset={removeReset}
        />
      }
      {store.getState().user !== null &&
        <Blog blogs={store.getState().blogs} user={store.getState().user} title={title} author={author} url={url}
          store={props.store} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
          setNotification={setNotification} removeReset={removeReset}
          handleLogout={handleLogout} notification={notification}
        />
      }
    </div>
  )
}

export default App
