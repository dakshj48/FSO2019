import React from 'react'
import Notification from './Notifications'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'
import { setUser } from '../reducers/appReducer'

const Blog = ({ store, removeReset }) => {

  const handleLogout = () => {
    window.localStorage.clear()
    store.dispatch(setUser(null))
  }

  return (<div>
    <h1>
      blogs
    </h1>
    <Notification message={store.getState().notification} />
    <p>
      {store.getState().app.user.username} logged in
      <button type='submit' onClick={() => handleLogout()}>logout</button>
    </p>
    <Togglable buttonLabel='new blog'>
      <BlogForm store={store} removeReset={removeReset}
      />
    </Togglable>
    {store.getState().app.blogs.map(blog =>
      <BlogPost key={blog.id} blog={blog} store={store} />
    )}
  </div>)
}

export default Blog
