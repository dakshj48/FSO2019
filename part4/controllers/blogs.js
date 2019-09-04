const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { passwordHash: 0, blogs: 0 } )
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)
    const user = await User.findById(decodedToken.id)

    if (!body.title && !body.url) {
      return response.status(400).end()
    }

    if (!body.likes) {
      blog.likes = 0
    }

    blog.user = user.id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(blog)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    return response.status(404).json(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === decodedToken.id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      const user = await User.findById(decodedToken.id)
      const index = user.blogs.findIndex(obj => obj === request.params.id)
      user.blogs.splice(index, 1)
      await user.save()
      response.status(204).end()
    }
    else {
      response.status(403).json({ error: 'blog can only be deleted by its own user' })
    }
  }
  catch (err) {
    return err
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }
  try {
    const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(res.toJSON())
  }
  catch (exception) {
    return exception
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  try {
    const blog = await Blog.findById(request.params.id)
    const comments = blog.comments.concat(body.comment)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: comments
    }
    const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(res.toJSON())
  } catch (exception) {
    return exception
  }
})

module.exports = blogsRouter
