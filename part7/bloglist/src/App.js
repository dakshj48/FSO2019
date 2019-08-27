import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import { setBlogs, setUser } from './reducers/appReducer'

const App = (props) => {
  const store = props.store

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.sort((a,b) => b.likes - a.likes)
        store.dispatch(setBlogs(initialBlogs))
      })
  }, [store])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [store])

  const removeReset = (obj) => (({reset, ...others}) => ({...others}))(obj)

  return (
    <div>
      {store.getState().app.user === null &&
        <Login store={store} removeReset={removeReset} />
      }
      {store.getState().app.user !== null &&
        <Blog store={props.store} removeReset={removeReset} />
      }
    </div>
  )
}

export default App
