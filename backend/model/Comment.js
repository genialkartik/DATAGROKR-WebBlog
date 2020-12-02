const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
// todo experiment: nestedComment : {type: commentSchema}
const commentSchema = new mongoose.Schema({
  comment: [
    {
      id: {
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
      nestedComment: Array,
      date_created: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

commentSchema.pre('save', async (next)=>{
  const comment = this
  comment.id = uuidv4()
  next()
})

const Comment = mongoose.model('comments', commentSchema)
module.exports = Comment