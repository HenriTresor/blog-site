require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// declare constant variables

const app = express()
const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

// connect to mongoose and start server

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('connected to database');
}).catch((err) => console.log('ERROR CONNECTING TO MONGODB:', err.message))


// middlewares
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set default engine

app.set('view engine', 'ejs')
app.set('views', 'views')

// routes

// require external routes

const authRoute = require('./routes/auth.route')
const blogRoute = require('./routes/blog.route')
const { getAllPosts } = require('./controllers/blog.controller')

app.use('/auth', authRoute)
app.use("/blog",blogRoute)

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/public/blog.html')
})

app.get('/blogs', getAllPosts)

app.get('/new-blog', (req, res) => {
    res.sendFile(__dirname + '/public/new.blog.html')
})


app.get('/henri-tresor/portfolio', (req, res) => {
    res.sendFile(__dirname + '/public/portfolio.html')
})

app.all('/*', (req, res) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})


app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
})