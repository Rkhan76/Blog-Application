const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const app = express()
const port = 3000

// Move the MongoDB connection above middleware setup
mongoose
  .connect('mongodb://127.0.0.1:27017/blogify')
  .then(() => {
    console.log('MongoDb Connected')

    app.set('view engine', 'ejs')
    app.set('views', path.resolve('./views'))

    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(checkForAuthenticationCookie('token'))
    app.use(express.static(path.resolve('./public')))

    app.use('/user', userRoute)
    app.use('/blog', blogRoute)

    app.get('/', async (req, res) => {
      const allBlogs = await Blog.find({})
      res.render('home', { user: req.user, blogs: allBlogs })
    })

    app.listen(port, () => console.log(`Server is running on ${port}`))
  })
  .catch((error) => console.error('MongoDb Connection Error:', error))
