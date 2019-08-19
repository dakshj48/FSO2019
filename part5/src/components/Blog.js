import React from 'react'
import Notification from './Notifications'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogPost from './BlogPost'

const Blog = ({
  blogs, user, title, author, url, setBlogs, setTitle,
  setAuthor, setUrl, handleLogout, handleNewBlog, notification
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
        setUrl={setUrl} handleNewBlog={handleNewBlog}
      />
    </Togglable>
    {blogs.map(blog =>
      <BlogPost key={blog.id} blog={blog} blogs={blogs} user={user} setBlogs={setBlogs}/>
    )}
  </div>
)

export default Blog
