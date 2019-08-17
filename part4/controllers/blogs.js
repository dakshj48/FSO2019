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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    let blog = {}
    let user = {}
    if (!body.title && !body.url) {
      return response.status(400).end()
    }
    if (!body.likes) {
      blog = new Blog({ ...request.body, likes: 0 })
    }
    else {
      blog = new Blog({ ...request.body, user: user._id })
    }
    user = await User.findOne({ username: 'root' })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    return response.status(404).json(exception)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === decodedToken.id.toString() ) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    response.status(403).json({ error: 'blog can only be deleted by its own user' })
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

module.exports = blogsRouter
