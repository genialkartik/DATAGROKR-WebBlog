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
      Likes: [], Impressions: [],
      visitorsCount: 0,
    })
    await newBlog.save()
      .then(data => {
        res.status(200).json({ uploaded: data ? true : false, blogData: data })
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
    Blog.findOne({ BlogId: req.body.blogId }, (err, blogData) => {
      var liked = blogData.Likes.find(name => name == 'Madan')
      var impressed = blogData.Impressions.find(name => name == 'Madan')
      res.status(200).json(err ? null : {
        blogData,
        like_bool: liked ? true : false,
        impress_bool: impressed ? true : false
      })
    })
  } catch (error) {
    console.log(error)
    res.status(200).json(null)
  }
})

router.post('/blog/delete', async (req, res) => {
  try {
    Blog.deleteOne({ BlogId: req.body.blogId }, (err, data) => {
      res.status(200).json({ is_deleted: err ? false : true })
    })
  } catch (error) {
    console.log(error)
    res.json({ is_deleted: false })
  }
})

router.post('/like/reaction', async (req, res) => {
  try {
    Blog.updateOne(
      { BlogId: req.body.id },
      req.body.add ?
        { $push: { Likes: 'Madan' } } :
        { $pull: { Likes: 'Madan' } },
      err => {
        res.json({ liked: err ? false : true })
      })
  } catch (error) {
    console.log(error)
    res.json({ liked: false })
  }
})

router.post('/impression/reaction', async (req, res) => {
  try {
    Blog.updateOne(
      { BlogId: req.body.id },
      req.body.add ?
        { $push: { Impressions: 'Madan' } } :
        { $pull: { Impressions: 'Madan' } },
      err => {
        res.json({ impressed: err ? false : true })
      })
  } catch (error) {
    console.log(error)
    res.json({ impressed: false })
  }
})


module.exports = router