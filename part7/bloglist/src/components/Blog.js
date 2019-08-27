import React from 'react'
import Notification from './Notifications'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'

const Blog = ({
  blogs, user, title, author, url, store, setTitle,
  setAuthor, setUrl, handleLogout, setNotification, notification,
  removeReset
}) => (
  <div>
    <h1>
      blogs
    </h1>
    <Notification message={notification} />
    <p>
      {user.username} logged in
      <button type='submit' onClick={() => handleLogout()}>logout</button>
    </p>
    <Togglable buttonLabel='new blog'>
      <BlogForm title={title} author={author} url={url}
        setTitle={setTitle} setAuthor={setAuthor}
        setUrl={setUrl} setNotification={setNotification}
        store={store} removeReset={removeReset}
      />
    </Togglable>
    {blogs.map(blog =>
      <BlogPost key={blog.id} blog={blog} blogs={blogs} user={user} store={store} />
    )}
  </div>
)

export default Blog
