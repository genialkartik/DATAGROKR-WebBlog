const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
    minLength: 8
  },
  Name: {
    type: String,
    required: true
  },
  Avatar: String
})

userSchema.pre('save', async function (next) {
  // Hash the Password before saving the user model
  const user = this
  if (user.isModified('Password')) {
    user.Password = await bcrypt.hash(user.Password, 8)
  }
  next()
})

userSchema.statics.findByCredentials = async (Username, Password) => {
  // Search for a user by req no and Password.
  const user = await User.findOne({ Username })
  if (!user) {
    return null
  } else {
    const isPasswordMatch = await bcrypt.compare(Password, user.Password)
    if (!isPasswordMatch) {
      return null
    } else {
      return user
    }
  }
}

const User = mongoose.model('users', userSchema)

module.exports = User