const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require('body-parser')
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/blog')
.then(() => console.log('connected to MongoDB...'))
.catch(err => console.log('not able to connect to MongoDB...', err))

const commentSchema = new mongoose.Schema({
//    blogId: objectId(),
    text: String,
    postTime: {type:Date, default: Date.now},
   
//    author:objectId()

})

const Comment = new mongoose.model('Comment', commentSchema)

app.get('/api/post/comment',async (req,res) => {
   const comment = await Comment.find();
   res.send(comment);
    
})

app.post('/api/post/comment',async (req,res) => {
    try{
        console.log(req.body)
        let comment = new Comment ({
            text: req.body.text
        })
    
        comment= await comment.save()
        res.send(comment)
    }catch(e){
        res.send("err");
        console.log(e.message);
    }
    
    
})

app.put('api/post/comment/:commentId', async(req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text:req.body.text})
    res.send(comment)
})

app.get('api/post/comment/:commentId', async(req, res) =>{
    const comment = await Comment.findById(req.params.commentId)
    res.send(comment)
})

app.delete('api/post/comment/:commentId', async(req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.commentId)
    res.send()
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})