const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

let model = null;

const replySchema = new Schema({
    postId : String,
    date : Date,
    content : String,
    createdBy : String,
    author : String
},
{collection: 'replies'});

module.exports.getReply = ()=>{
    model = Mongoose.model('replySchema',replySchema);
    return model;
};