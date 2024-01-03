const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')
const exp = require('constants')

const app = express()
const port = 3000

mongoose
  .connect('mongodb://127.0.0.1:27017/blogify')
  .then((e) => console.log('MongoDb Connected'))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended: false}));
app.use('/user', userRoute)


app.get('/', (req, res) => {
  res.render('home')
})

app.listen(port, () => console.log(`server is running on ${port}`))
