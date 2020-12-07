const express = require('express')
const app = express()
const session = require('express-session')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const path = require('path')

app.use(express.static(path.join(__dirname, "./build")));
app.use(cors());
var PORT = process.env.PORT || 2020
// prevent CORS
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

mongoose.connect('', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

app.use(require('./routes/blog'))
app.use(require('./routes/comment'))
app.use(require('./routes/user'))

// access build files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT:  ${PORT}`)
})

// Socket.io for Current Readers at a Post
const io = require('socket.io')(server);

let map = new Map()
let map2 = new Map()

io.on('connect', (socket) => {
  console.log('socket connection connected')
  socket.on('readBlog', ({ blogId }, callback) => {
    map2.set(socket.id, blogId);
    map.set(blogId, map.get(blogId) ? map.get(blogId) + 1 : 1);
    callback(map.get(blogId))
  })
  socket.on('disconnect', () => {
    console.log('socket connection disconnected')
    var blogid = map2.get(socket.id)
    map.set(blogid, map.get(map2.get(socket.id)) - 1)
    map2.delete(socket.id)
  })
})
