const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Token', schema)
