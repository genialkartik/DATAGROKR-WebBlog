const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const fileUpload = require('express-fileupload')

app.use(cors());

var PORT = process.env.PORT || 2020

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json())
app.use(fileUpload())

//User's session
app.use(session({
  secret: 'datagrokr',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 * 7 }  // 7 Days
}));

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://genialkartik:genialkartik@datagrokr.fnll7.mongodb.net/datagrokr', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

app.use(require('./routes/blog'))
app.use(require('./routes/comment'))

app.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`)
})
