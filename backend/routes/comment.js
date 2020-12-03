const express = require('express')
const { v4: uuidv4 } = require('uuid')
const router = express.Router()

const Comment = require('../model/Comment')

router.post('/get/comment', async (req, res) => {
  try {
    Comment.find({ blogId: req.body.blogId }, (err, data) => {
      res.status(200).send(err ? [] : data)
    })
  } catch (error) {
    console.log(error)
    res.status(200).json([])
  }
})

router.post('/add/comment', async (req, res) => {
  try {
    var newComment = new Comment({
      commentId: uuidv4(),
      blogId: req.body.blogId,
      author: 'Madan Lal',
      text: req.body.commentText
    })
    await newComment.save()
      .then(data => {
        res.status(200).json({ data })
      })
  } catch (error) {
    console.log(error)
    res.status(200).json({ data: null })
  }
})

router.post('/add/reply', async (req, res) => {
  try {
    console.log(req.body)
    var newReply = new Comment({
      commentId: uuidv4(),
      blogId: req.body.blogId,
      author: 'Madan Lal',
      text: req.body.commentText
    })
    Comment.findByIdAndUpdate(
      req.body.id ,
      { $push: { Comments: newReply } },
      (err, data) => {
        console.log(data)
        res.json({ replied: err ? false : true })
      })
  } catch (error) {
    console.log(error)
    res.status(200).json({ replied: false })
  }
})

module.exports = router