var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// configure app
app.set('view engine', 'ejs');

// use middleware
app.use(bodyParser());
app.use(express.static('public'));

// define routes
app.use(require('./controller/home'));
app.get("/", function(req, res){
   res.redirect("/home"); 
});

// start the server
app.listen(8079, function() {
	console.log('ready on port 8079');
})