/**
 * Created by henry on 19/10/2015.
 */

var express = require('express');
var router = express.Router();
var Collection = require('../lib/Collection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});
router.post('/indexing', function(req, res, next) {
    console.log(req.body);


    var collection = new Collection(); 
	collection.loadDocuments('../file/ADI/adi.all');
	collection.loadStopWords('../file/stopWord.txt');
	collection.processData();
	collection.countIdf();
	collection.indexing(
		'what is information science? give definitions where possible.',
		req.body.TFD,
		req.body.IDFD,
		req.body.NormalizationD,
		req.body.TFQ,
		req.body.IDFQ,
		req.body.NormalizationQ);
    res.redirect('/');
});

module.exports = router;