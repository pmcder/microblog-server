const accountModal = require('../models/accountModel');
const userAccount = accountModal.getUserAccount();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
//var config = require('../config'); // get config file

module.exports = async (req, res) => {

    let userName = req.body.userName;
    
    let user =  await userAccount.findOne({ 'userName': userName });
    
    if (!user) {

        let hashedPassword = bcrypt.hashSync(req.body.password, 8);

        let newUser = new userAccount({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            hashedPassword: hashedPassword,
            createdOn : Date.now()
        });
        newUser.save();
        console.log('created');
        res.status(201).send();
    }
    else {
        res.send('username already exists');
    }
}