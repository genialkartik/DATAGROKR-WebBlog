const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const blogSchema = mongoose.Schema({
  BlogId: String,
  Author: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Tags: {
    type: String,
    required: true
  },
  Cover: {
    type: String,
    required: true
  },
  Likes: Number,
  Impressions: Number,
  visitorsCount: Number,
  date_created: {
    type: Date,
    default: Date.now
  }
})

blogSchema.pre('save', async function (next) {
  const blog = this
  blog.BlogId = uuidv4()
  next()
})

const Blog = mongoose.model('blogs', blogSchema)
module.exports = Blog