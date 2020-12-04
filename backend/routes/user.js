const rtr = require('express').Router()
const User = require('../model/User')

rtr.get('/user/login', async (req, res) => {
  res.status(200).json({
    logged_in: req.session.userdata ? true : false,
    fullname: req.session.userdata ? req.session.userdata.fullname : 'Guest'
  })
})

rtr.post('/user/login', async (req, res) => {
  try {
    if (req.session.userdata)
      res.status(200).json({ logged_in: true })
    else {
      const { username, password } = req.body
      const user = await User.findByCredentials(username, password)
      if (!user)
        return res.status(200).json({ logged_in: false })
      else {
        // save user into session
        req.session.userdata = {
          fullname: user.Name,
          username: user.Username,
        }
        res.status(200).json({ logged_in: true })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ logged_in: false })
  }
})

rtr.post('/user/signup', async (req, res) => {
  console.log(req.body)
  try {
    const { fullname, username, password } = req.body
    User.findOne({ Username: username }, async (err, user) => {
      if (user || err) {
        res.json({ sign_up: false })
      }
      else {
        const newUser = new User({
          Name: fullname,
          Username: username,
          Password: password
        })
        await newUser.save()
          .then((item) => {
            if (item) {
              req.session.userdata = {
                username: item.Username,
                fullname: item.Name
              }
              res.status(200).json({ sign_up: true })
            } else {
              res.status(200).json({ sign_up: false })
            }
          })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

rtr.get('/user/logout', async (req, res) => {
  try {
    if (req.session.userdata) {
      req.session.destroy(function () {
      });
    }
    res.status(200).json({ logged_out: true })
  } catch (error) {
    console.log(error)
    res.status(200).json({ logged_out: false })
  }
});

module.exports = rtr