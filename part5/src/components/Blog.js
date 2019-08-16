import React from 'react'

const printBlog = (blog) => (
  <div key={blog.id}>
    {blog.title} {blog.author}
  </div>
)

const Blog = ({ blogs, user, handleLogout}) => (
  <div>
      <h1>
        blogs
      </h1>
      <p>
        {user.username} logged in
        <button type='submit' onClick={() => handleLogout()}>logout</button>
      </p>
      {blogs.map(blog => printBlog(blog))}
    </div>
)

export default Blog
