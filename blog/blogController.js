const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const blogModel = require('../models/index');
const blog = blogModel.blogPost.getBlog();
const VerifyToken = require('../jwt/jwt');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
    
    let allBlogPosts = await blog.find({});
    let posts = allBlogPosts.map(p=>{
        return {
            id : p._id,
            date : p.date,
            content : p.content,
            author : p.author
        }
    });
        res.status(200).send(posts.reverse());
});

router.post('/', VerifyToken,(req,res)=>{
    console.log(req.body)
    let newBlogPost = new blog(
        {
            date : Date.now(),
            content : req.body.content,
            createdBy : req.id,
            author : req.body.author
        }
    );
    newBlogPost.save();
    res.status(201).send();
});

router.put('/', VerifyToken, async (req,res)=>{

    let userId = req.userId; 
  
    let userPosts = await blog.findByIdAndUpdate({createdBy : userId, _id : req.body.id},
        {content:req.body.content}
        );
    res.status(200).send();
    
});

router.delete('/',VerifyToken,async(req,res)=>{
    let blogId = req.body.id;
    await blog.findByIdAndDelete(blogId);
    res.status(200).send();
})

module.exports = router;
