import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogPost = ({ blog, blogs, user, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const showIfUser = { display: (user.username === blog.user.username || user.id === blog.user) ? '' : 'none' }

  const handleLikes = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { ...blog, likes: blog.likes+1 }
      await blogService.update(blog.id, newBlog)
      let newBlogs = [...blogs]
      const index = newBlogs.findIndex(obj => obj.id === blog.id)
      newBlogs[index].likes++
      newBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogs)
    }
    catch (error) {
      console.log(error)
      console.log('Error while liking')
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        let newBlogs = [...blogs]
        const index = newBlogs.findIndex(obj => obj.id === blog.id)
        newBlogs.splice(index, 1)
        setBlogs(newBlogs)
      }
      catch (error) {
        console.log(error)
        console.log('Failed to remove the blog')
      }
    }
  }

  return (
    <div style={blogStyle}>
      <span onClick={toggleVisibility}>
        {blog.title} {' '}
      </span>
      {blog.author}
      <div style={showWhenVisible}>
        {blog.url} <br />
        {blog.likes} likes <button onClick={handleLikes}>like</button> <br />
        added by {blog.user.username || user.username} <br />
        <div style={showIfUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default BlogPost
