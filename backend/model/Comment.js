const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true
  },
  blogId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  Comments: Array,
  date_created: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('comments', commentSchema)
module.exports = Comment