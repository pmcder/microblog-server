const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

let model = null;

const notificationSchema = new Schema({

    date : Date,
    message : String,
    owner : String,
    read : Boolean
},
{collection: 'notifications'});

module.exports.getNotification = ()=>{
    model = Mongoose.model('notificationSchema',notificationSchema);
    return model;
};