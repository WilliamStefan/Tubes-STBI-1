/**
 * Created by William on 24/10/2015.
 */

var express = require('express');
var router = express.Router();
// var html = new EJS({url: 'interactive.ejs'}).render("../views/data.json");

/* GET interactive page. */
router.get('/interactive', function(req, res, next) {
    res.render('interactive');
});

router.post('/indexing', function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;