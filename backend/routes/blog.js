const express = require('express')
const router = express.Router()

const Blog = require('../model/Blogs')

// upload blog
router.post('/blog/upload', async (req, res) => {
  try {
    var newBlog = new Blog({
      Author: 'Kartik Tyagi',
      Title: req.body.title,
      Tags: req.body.tags,
      Description: req.body.desc,
      Cover: req.files ? req.files.cover.name : '', // cover link
      Likes: 1, Impressions: 0,
      visitorsCount: 0,
    })
    await newBlog.save()
      .then(data => {
        res.status(200).json({ uploaded: data ? true : false, blogData:data })
      })
  } catch (error) {
    console.log(error)
    res.status(200).json({ uploaded: false })
  }
})

// list all blogs
router.get('/blogs/list', async (req, res) => {
  try {
    Blog.find({}, (err, data) => {
      res.status(200).json({ blog_list: err ? [] : data })
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({ msg: 'Error finding blog list' })
  }
})

// read blog
router.post('/read', async (req, res) => {
  try {
    Blog.findOne({ BlogId: req.body.blogId }, (err, data) => {
      res.status(200).json(err ? null : data)
    })
  } catch (error) {
    console.log(error)
    res.status(200).json(null)
  }
})

module.exports = router