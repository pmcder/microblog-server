const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const replyModel = require('../models/replyModel');
const Reply = replyModel.getReply();
const VerifyToken = require('../jwt/jwt');
const { reply } = require('../models');
const blogModel = require('../models/index');
const blog = blogModel.blogPost.getBlog();
const NotificationModel = require('../models/notificationModel');
const Notification = NotificationModel.getNotification();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Adds a new reply to the blog post with passed postId.
 * Creates a new notification for the author of the post and
 * saves to the notifications collection.
 * 
 * TODO : 
 * change author from userName to _id
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

    let author = await blog.findById(req.body.postId);
    console.log(author.author);

    let notification = new Notification({
        date : Date.now(),
        message : "you have a new reply on your post !",
        owner : author.author,
        read : false
    })

    notification.save();

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