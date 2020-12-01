const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const blogSchema = mongoose.Schema({
  BlogId: {
    type: String,
    require
  },
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Cover: {
    type: String,
    required: true
  },
  Likes: Number,
  Impressions: Number,
})

blogSchema.pre('save', async function (next) {
  const blog = this
  blog.BlogId = uuidv4()
  next()
})

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog