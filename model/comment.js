const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const commentSchema = new mongoose.Schema({
    //    blogId: objectId(),
        text: String,
        postTime: {type:Date, default: Date.now},
       
    //    author:objectId()
    
    })
    
    const Comment = new mongoose.model('Comment', commentSchema)
    
    router.get('/',async (req,res) => {
       const comment = await Comment.find();
       res.send(comment);
        
    })
    
    router.post('/',async (req,res) => {
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
    
    router.put('/:commentId', async(req, res) => {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text:req.body.text})
        res.send(comment)
    })
    
    router.get('/:commentId', async(req, res) =>{
        const comment = await Comment.findById(req.params.commentId)
        res.send(comment)
    })
    
    router.delete('/:commentId', async(req, res) => {
        console.log("err");
        const comment = await Comment.findByIdAndRemove(req.params.commentId)
        res.send(comment)
    })

    module.exports = router;