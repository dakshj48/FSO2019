import React from 'react'
import { useField } from '../hooks/index'
import blogService from '../services/blogs'

const BlogForm = ({
  setNotification, title, author,
  url, setTitle, setAuthor, setUrl,
  setBlogs, removeReset
}) => {

  const titleHook = useField('text')
  const authorHook = useField('text')
  const urlHook = useField('text')

  setTitle(titleHook.value)
  setAuthor(authorHook.value)
  setUrl(urlHook.value)

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({ 'title': title, 'author': author, 'url': url })
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setNotification([`${title} by ${author} added`, 'success'])
      setTimeout(() => {
        setNotification([])
      }, 5000)
      titleHook.reset()
      authorHook.reset()
      urlHook.reset()
    }
    catch (error) {
      setNotification(['Failed to save the blog', 'error'])
      setTimeout(() => {
        setNotification([])
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
