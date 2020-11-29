const express = require('express')
const router = express.Router()
const User = require('../models/User')

// check login status
router.get('/user/login', async (req, res) => {
  if (req.session.user)
    res.status(200).json({ user: req.session.user })
  else
    res.status(200).json({ msg: 'no session found' })
})

//Login a registered user
router.post('/user/login', async (req, res) => {
  try {
    if (req.session.user)
      res.status(200).json({ user: req.session.user })
    else {
      const { username, password } = req.body
      const user = await User.findByCredentials(username, password)
      if (!user)
        return res.status(200).json({
          login: false,
          msg: 'Invalid Login Credentials'
        })
      else {
        // save user into session
        req.session.user = {
          username: user.Username,
          name: user.Name
        }
        res.status(200).json({
          login: true,
          user: {
            username: user.Username,
            name: user.Name
          }
        })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ login: false, user: {} })
  }
})

// Log user out of the application
router.post('/user/logout', async (req, res) => {
  req.session.destroy()
  res.status(200).json({
    user: null,
    logged_out: true
  })
})

module.exports = router