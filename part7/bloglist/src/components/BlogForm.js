import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/appReducer'
import { setNotification } from '../reducers/notificationReducer'

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
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input {...removeReset(titleHook)} />
        </div>
        <div>
          author:
          <input {...removeReset(authorHook)} />
        </div>
        <div>
          url:
          <input {...removeReset(urlHook)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
