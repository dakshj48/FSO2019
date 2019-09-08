import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'
import Notification from './Notifications'

const Blogs = ({ store, removeReset }) => {

  return (
    <div>
      <h1>
        blogs
      </h1>
      <Notification message={store.getState().notification} />
      <Togglable buttonLabel='new blog'>
        <BlogForm store={store} removeReset={removeReset}
        />
      </Togglable>
      <br />
      {store.getState().app.blogs.map(blog =>
        <BlogPost key={blog.id} blog={blog} store={store} />
      )}
    </div>
  )
}

export default Blogs
