const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require('body-parser')
const app = express();
const comment = require('./model/comment')

// Body-parser middleware
app.use(express.json())

app.use('/api/post/comment', comment)

mongoose.connect('mongodb://localhost/blog')
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.log('not able to connect to MongoDB...', err))



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})