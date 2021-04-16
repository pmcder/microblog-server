var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { stringify } = require('querystring');

const credentials = require("./credentials.js");



const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database +
	'?retryWrites=true&w=majority';

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var blogController = require('./blog/blogController');
var replyController = require('./blog/replyController');
var notificationController = require('./notifications/notificationController');

var routes = require('./routes/index');
app.use('/', routes);

app.use('/api/blog', blogController);
app.use('/api/replies', replyController);
app.use('/api/notifications',notificationController);

app.use(function(req, res) {
    res.status(404);
    console.log('404');
    console.log(req.url);
    console.log(req.body);
});

app.listen(3000, function(){
  mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true});  
  console.log('application running at http://localhost:3000');
});
