import React from 'react'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/appReducer'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks/index'

const BlogNoHistory = (props) => {
  const store = props.store
  const user = store.getState().app.user
  const blogs = store.getState().app.blogs
  const blog = props.blog
  const commentHook = useField('text')

  const showIfUser = { display: (user.username === blog.user.username) ? '' : 'none' }

  const handleLikes = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { ...blog, likes: blog.likes+1 }
      await blogService.update(blog.id, newBlog)
      let newBlogs = [...blogs]
      const index = newBlogs.findIndex(obj => obj.id === blog.id)
      newBlogs[index].likes++
      newBlogs.sort((a, b) => b.likes - a.likes)
      store.dispatch(setBlogs(newBlogs))
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
        props.history.push('/')
        await blogService.deleteBlog(blog.id)
        let newBlogs = [...blogs]
        const index = newBlogs.findIndex(obj => obj.id === blog.id)
        newBlogs.splice(index, 1)
        store.dispatch(setBlogs(newBlogs))
      }
      catch (error) {
        console.log(error)
        console.log('Failed to remove the blog')
      }
    }
  }

  const keyGen = () => Math.floor((Math.random() * 10000) + 1)

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addComment(blog.id, commentHook.value)
      let newBlogs = [...blogs]
      const index = newBlogs.findIndex(obj => obj.id === blog.id)
      newBlogs[index] = newBlog
      store.dispatch(setBlogs(newBlogs))
      commentHook.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>
        <b>{blog.title}</b>
      </h1>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes <button onClick={handleLikes}>like</button> <br />
      added by {blog.user.name} <br />
      <div style={showIfUser}>
        <button onClick={handleRemove}>remove</button>
      </div>
      <br />
      <div>
        <b>comments</b>
        <form onSubmit={handleComment}>
          <input {...props.removeReset(commentHook)}/>
          <button type='submit'>add comment</button>
        </form>
        <ul style={{ listStyleType: 'circle' }}>
          {blog.comments.map(comment => <li key={keyGen()}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}

const Blog = withRouter(BlogNoHistory)

export default Blog
