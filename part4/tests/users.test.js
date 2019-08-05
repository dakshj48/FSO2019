const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('checking if the following username and password requirements are met:', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'SuperUser', password: 'secret' })
    await user.save()
  })

  test('username is more than 3 characters', async () => {
    const newUser = {
      username: 'un',
      name: 'Daksh Jain',
      password: 'secret'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    await api
      .post('/api/users')
      .send({ username: 'morethan3', name: 'Daksh', password: 'secret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('password is more than 4 characters', async () => {
    const newUser = {
      username: 'username1',
      name: 'Daksh Jain',
      password: ''
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    await api
      .post('/api/users')
      .send({ username: 'username2', name: 'Daksh', password: 'morethan3' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('username is unique', async () => {
    const newUser = {
      username: 'root',
      name: 'Daksh Jain',
      password: ''
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'root', name: 'SuperUser', password: 'secret' })
  await user.save()
  mongoose.connection.close()
})
