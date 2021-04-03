const accountModal = require('../models/accountModel');
const userAccount = accountModal.getUserAccount();

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../jwt/config');

module.exports = async (req, res) => {

    let userName = req.body.userName;
    let uAccount = await userAccount.findOne({ 'userName': userName });
    user = await userAccount.findById(uAccount._id).map(s=>{
        return{
        id : s._id,
        userName : s.userName,
        firstName : s.firstName,
        lastName : s.lastName,
        email : s.email
        }
    });

    if (!user) {
        res.send('username not found!');
    }
    else {
        
        let isValidPassword = bcrypt.compareSync(req.body.password, uAccount.hashedPassword);

        if (isValidPassword) {
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
          
              res.status(200).send({ auth: true, token: token, u : user });
 
            }
        else {
            res.status(401).send({ auth: false, token: null });
        }
    }



}

