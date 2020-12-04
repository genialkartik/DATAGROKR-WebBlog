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
    var newReply = new Comment({
      commentId: uuidv4(),
      blogId: req.body.blogId,
      author: 'Madan Lal',
      text: req.body.commentText
    })
    Comment.updateOne(
      { blogId: req.body.blogId },
      { $push: { Comments: newReply } },
      (err, data) => {
        res.json({ replied: err ? false : true })
      })
  } catch (error) {
    console.log(error)
    res.status(200).json({ replied: false })
  }
})

// router.get('/get/reply', async (req, res) => {
//   let obj = { "name": "Add a new File", "route": "level1_b/level2_a/level3_a/new_file2" };
//   let segments = obj.route.split('/');;
//   let query = { route: segments[0] };
//   let updateQ, options = {};
//   if (segments.length === 2) {
//     updateQ = { $push: { Comments: obj } }
//   } else {
//     let updatePath = "Comments";
//     options.arrayFilters = [];
//     for (let i = 0; i < segments.length - 2; i++) {
//       updatePath += `.$[child${i}].Comments`;
//       options.arrayFilters.push({ [`child${i}.route`]: segments.slice(0, i + 2).join('/') });
//     }
//     updateQ = { $push: { [updatePath]: obj } };
//   }
//   // Comment.update({})
//   console.log('segments', segments);
//   console.log('query', query);
//   console.log('update', updateQ);
//   console.log('options', options);
// })

module.exports = router