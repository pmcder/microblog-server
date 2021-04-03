const accountModal = require('../models/accountModel');
const userAccount = accountModal.getUserAccount();



module.exports = async(req,res,next)=>{

    let user = null;
  
    user = await userAccount.findById(req.userId).map(s=>{
        return{
        id : s._id,
        userName : s.userName,
        firstName : s.firstName,
        lastName : s.lastName,
        email : s.email
        }
    });
    
    if(!user){
        res.send('user not found!');
    }
    else{
    res.status(200).send(user);
    }
}