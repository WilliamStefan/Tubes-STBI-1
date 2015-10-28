/**
 * Created by henry on 19/10/2015.
 */

var express = require('express');
var router = express.Router();
var global = require('./global');

/* GET home page. */
router.get('/tes', function(req, res, next) {
    res.render('tes');
});

module.exports = router;