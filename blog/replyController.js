const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const replyModel = require('../models/replyModel');
const Reply = replyModel.getReply();
const VerifyToken = require('../jwt/jwt');
const { reply } = require('../models');

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * adds a new reply to the blog post with passed postId
 */
router.post('/',async(req,res)=>{
    
    let reply = new Reply  ({
    postId: req.body.postId,
    date : Date.now(),
    content : req.body.content,
    createdBy : req.body.createdBy,
    author : req.body.author
    });
    reply.save();
    res.status(201).send(); 
});

/**
 * returns all replies to the post for the postId passed in body.postId.
 * 
 */
router.get('/',async(req,res)=>{
   
    let postReplies = await Reply.find({postId:req.query.postId});
    let replies = postReplies.map(r=>{
        return{
        date : r.date,
        content : r.content,
        author : r.author
        }
    })
    res.send(replies)
})

module.exports = router;