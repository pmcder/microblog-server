var express = require('express');
var VerifyToken = require('../jwt/jwt');

var router = express.Router();

const signup = require('../api/signup.js');
const signin = require('../api/signin.js');
const getUser = require('../api/getUser.js');

router.get('/', (req, res) => {
    res.status(200).json({
        message: "We are handling your get request !"
    })});

router.post('/api/signup',signup);
router.post('/api/signin', signin);

router.get('/api/user',VerifyToken,getUser);

module.exports = router;