import React from 'react'
import Notification from './Notifications'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'

const Blog = ({
  title, author, url, store, setTitle,
  setAuthor, setUrl, handleLogout, removeReset
}) => (
  <div>
    <h1>
      blogs
    </h1>
    <Notification message={store.getState().notification} />
    <p>
      {store.getState().app.user.username} logged in
      <button type='submit' onClick={() => handleLogout()}>logout</button>
    </p>
    <Togglable buttonLabel='new blog'>
      <BlogForm title={title} author={author} url={url}
        setTitle={setTitle} setAuthor={setAuthor}
        setUrl={setUrl} store={store} removeReset={removeReset}
      />
    </Togglable>
    {store.getState().app.blogs.map(blog =>
      <BlogPost key={blog.id} blog={blog} store={store} />
    )}
  </div>
)

export default Blog
