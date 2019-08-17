import React from 'react'

const printBlog = (blog) => (
  <div key={blog.id}>
    {blog.title} {blog.author}
  </div>
)

const Blog = ({ blogs, user, title, author, url, setTitle, setAuthor, setUrl, handleLogout, handleNewBlog}) => (
  <div>
      <h1>
        blogs
      </h1>
      <p>
        {user.username} logged in
        <button type='submit' onClick={() => handleLogout()}>logout</button>
      </p>
      <h1>
        create new
      </h1>
      <form onSubmit={handleNewBlog}> 
        <div>
          title:
            <input type='text' value={title} name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author:
            <input type='text' value={author} name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url:
            <input type='text' value={url} name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog => printBlog(blog))}
    </div>
)

export default Blog
