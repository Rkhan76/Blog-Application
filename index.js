const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { checkForAuthenticationCookie } = require('./middlewares/authentication')

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

    app.use('/user', userRoute)

    app.get('/', (req, res) => {
      res.render('home', { user: req.user })
    })

    app.listen(port, () => console.log(`Server is running on ${port}`))
  })
  .catch((error) => console.error('MongoDb Connection Error:', error))
