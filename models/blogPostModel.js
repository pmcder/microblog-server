const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

let model = null;

const postSchema = new Schema({

    date : Date,
    content : String,
    createdBy : String,
    author : String,
    at : String // will notify that account 
},
{collection: 'blog_posts'});

module.exports.getBlog = ()=>{
    model = Mongoose.model('postSchema',postSchema);
    return model;
};

