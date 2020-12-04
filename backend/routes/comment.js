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
      parentId: 'root',
      author: req.session.userdata ? req.session.userdata.fullname : '',
      level: 1,
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
      parentId: req.body.id,
      blogId: req.body.blogId,
      author: req.session.userdata ? req.session.userdata.fullname : '',
      level: 2,
      text: req.body.commentText
    })
    Comment.findByIdAndUpdate(req.body.id,
      { $push: { Comments: newReply } },
      (err) => {
        res.json({ replied: err ? false : true })
      })
  } catch (error) {
    console.log(error)
    res.status(200).json({ replied: false })
  }
})

router.post('/edit/comment', async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.level == 1) {
      Comment.findByIdAndUpdate(req.body.id,
        { text: req.body.newText }, (err) => {
          res.status(200).json({ is_updated: err ? false : true })
        })
    } else {
      Comment.updateOne(
        { _id: req.body.parentId, "Comments.commentId": req.body.commentId },
        { $set: { "Comments.$.text": req.body.newText } }, (err, data) => {
          console.log(err)
          console.log(data)
          res.status(200).json({ is_updated: err ? false : true })
        })
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ is_updated: false })
  }
})


router.post('/delete/comment', async (req, res) => {
  try {
    if (req.body.level == 1) {
      Comment.findByIdAndDelete(req.body.id, (err, data) => {
        res.status(200).json({ is_deleted: err ? false : true })
      })
    } else {
      Comment.updateOne(
        {},
        { $pull: { Comments: { commentId: req.body.commentId } } },
        err => {
          res.json({ is_deleted: err ? false : true })
        })
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ is_deleted: false })
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