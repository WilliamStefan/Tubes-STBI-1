/**
 * Created by henry on 19/10/2015.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});

router.post('/indexing', function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;