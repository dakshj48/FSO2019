const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  let blog = {}
  if (!request.body.title && !request.body.url) {
    return response.status(400).end()
  }
  if (!request.body.likes) {
    blog = new Blog({ ...request.body, likes: 0 })
  }
  else {
    blog = new Blog(request.body)
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
  catch (err) {
    return err
  }
})

module.exports = blogsRouter
