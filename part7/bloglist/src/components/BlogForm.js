import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/appReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Input, Icon } from 'semantic-ui-react'

const BlogForm = ({ store, removeReset }) => {

  const titleHook = useField('text')
  const authorHook = useField('text')
  const urlHook = useField('text')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        'title': titleHook.value,
        'author': authorHook.value,
        'url': urlHook.value
      })
      const newBlogs = await blogService.getAll()
      store.dispatch(setBlogs(newBlogs))
      store.dispatch(setNotification(
        [`${titleHook.value} by ${authorHook.value} added`, 'success']
      ))
      setTimeout(() => {
        store.dispatch(setNotification([]))
      }, 5000)
      titleHook.reset()
      authorHook.reset()
      urlHook.reset()
    }
    catch (error) {
      store.dispatch(setNotification(['Failed to save the blog', 'error']))
      setTimeout(() => {
        store.dispatch(setNotification([]))
      }, 5000)
    }
  }

  return (
    <div>
      <h1>
        create new
      </h1>
      <Form onSubmit={handleNewBlog}>
        <Form.Field>
          <label>
            title:
          </label>
          <Input {...removeReset(titleHook)} />
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <Input {...removeReset(authorHook)} />
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <Input {...removeReset(urlHook)} />
        </Form.Field>
        <Button animated type='submit' >
          <Button.Content visible>create</Button.Content>
          <Button.Content hidden>
            <Icon name='add' />
          </Button.Content>
        </Button>
      </Form>
      <br />
    </div>
  )
}

export default BlogForm
