const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.username.length < 3 || body.password.length < 3) {
      return response.status(400).json('Username and password must be atleast 3 characters long.')
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    if (exception.name === 'ValidationError') {
      return response.status(400).json('username is not unique.')
    } else {
      return response.status(404).json(exception)
    }
  }
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', { likes: 0, user: 0 } )
    response.json(users.map(u => u.toJSON()))
  } catch (exception) {
    return response.status(404).json(exception)
  }
})

module.exports = usersRouter
