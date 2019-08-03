const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct number of blogs are returned', async () => {
  const res = await api.get('/api/blogs')

  expect(res.header['content-type']).toContain('application/json')
  expect(res.body.length).toBe(1)
})

test('unique identifier property of the blog posts is correctly named id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

test('POST request successfully creates a new blog post', async () => {
  const newBlog = {
    title: 'React',
    author: 'Daksh Jain',
    url: 'daksh.me/react',
    likes: 20
  }
  const initialRes = await api.get('/api/blogs')
  const initialLength = initialRes.body.length
  await api.post('/api/blogs').send(newBlog)
  const res = await api.get('/api/blogs')
  const contents = res.body.map(r => r.title)

  expect(res.body.length).toBe(initialLength + 1)
  expect(contents).toContain('React')
})

test('likes is missing', async () => {
  const newBlog = {
    title: 'likes missing',
    author: 'Daksh Jain',
    url: 'daksh.me/like_missing'
  }
  await api.post('/api/blogs').send(newBlog)
  const res = await api.get('/api/blogs')
  const contents = res.body.map(r => r.likes)

  expect(contents).toContain(0)
})

test('bad request', async () => {
  const newBlog = {
    author: 'Daksh Jain',
    likes: 20
  }
  const res = await api.post('/api/blogs').send(newBlog)
  expect(res.status).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})
