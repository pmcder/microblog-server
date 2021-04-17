const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../jwt/jwt');
const NotificationModel = require('../models/notificationModel');
const Notification = NotificationModel.getNotification();

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async(req,res)=>{
    console.log(req.query.user)
    let notificationData = await Notification.find({owner : req.query.user})

    let notifications = notificationData.map(n=>{
        return{
            date : n.date,
            message : n.message,
            owner : n.owner,
            read : n.read
        }
    })
    res.send(notifications)

})

module.exports = router;