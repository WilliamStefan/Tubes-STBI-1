/**
 * Created by William on 24/10/2015.
 */

var express = require('express');
var router = express.Router();

/* GET help page. */
router.get('/help', function(req, res, next) {
    res.render('help');
});

router.post('/indexing', function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;