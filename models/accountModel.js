const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

let model = null;

const accountSchema = new Schema({

    firstName : String,
    lastName : String,
    email : String,
    userName : String,
    hashedPassword : String,
    createdOn : Date,
    notifications : [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "notifications" 
        }
    ]
},
{collection : 'userAccounts'});

module.exports.getUserAccount = ()=>{
    model = Mongoose.model('userAccount',accountSchema);
    return model;
}

