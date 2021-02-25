import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'
import Notification from './Notifications'

const Blogs = ({ store, removeReset }) => {

  return (
    <div>
      <h5 style={{margin: 0}}>
        Welcome {store.getState().app.user.name}
      </h5>
      <h1 style={{marginTop: 0}}>
        Blogs
      </h1>
      <Notification message={store.getState().notification} />
      <Togglable buttonLabel='add blog'>
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
