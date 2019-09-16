import React, { useState } from 'react'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/appReducer'
import { withRouter } from 'react-router-dom'
import { useField } from '../hooks/index'
import { Form, Button, Input, Icon, List, Confirm } from 'semantic-ui-react'

const BlogNoHistory = (props) => {
  const store = props.store
  const user = store.getState().app.user
  const blogs = store.getState().app.blogs
  const blog = props.blog
  const commentHook = useField('text')
  const [show, setShow] = useState(false)

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
    try {
      setShow(false)
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

  const keyGen = () => Math.floor((Math.random() * 10000) + 1)

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      if(!commentHook.value) {
        return
      }
      await blogService.addComment(blog.id, commentHook.value)
      const newBlogs = await blogService.getAll()
      store.dispatch(setBlogs(newBlogs))
      commentHook.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const capDecide = (count) => count === 1 ? 'like' : 'likes'

  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} {capDecide(blog.likes)} {' '}
      <Button animated onClick={handleLikes}>
        <Button.Content visible>like</Button.Content>
        <Button.Content hidden>
          <Icon name='like' />
        </Button.Content>
      </Button>
      <br />
      added by {blog.user.name} <br />
      <div style={showIfUser}>
        <Button animated type='submit' onClick={() => setShow(true)}>
          <Button.Content visible>remove</Button.Content>
          <Button.Content hidden>
            <Icon name='delete'/>
          </Button.Content>
        </Button>
        <Confirm
          open={show}
          onConfirm={handleRemove}
          onCancel={() => setShow(false)}
          content={`remove blog ${blog.title} by ${blog.author}?`}
        />
      </div>
      <br />
      <div>
        <b>comments</b>
        <Form onSubmit={handleComment}>
          <Input {...props.removeReset(commentHook)}/> {' '}
          <Button animated type='submit'>
            <Button.Content visible>add comment</Button.Content>
            <Button.Content hidden>
              <Icon name='add' />
            </Button.Content>
          </Button>
        </Form>
        <List bulleted>
          {blog.comments.map(comment => <List.Item key={keyGen()}>{comment}</List.Item>)}
        </List>
      </div>
    </div>
  )
}

const Blog = withRouter(BlogNoHistory)

export default Blog
