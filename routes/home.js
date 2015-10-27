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
var collection = new Collection(); 
router.post('/indexing', function(req, res, next) {
	collection.loadDocuments(req.body.docLocation);
	collection.loadQrels(req.body.relLocation);
	collection.loadQuery(req.body.queryLocation);
	collection.loadStopWords(req.body.stopwordLocation);
	collection.processData();
	collection.countIdf();
	collection.countRecallPrecision();
	collection.createInvertedFile(
		req.body.TFD,
		req.body.IDFD,
		req.body.NormalizationD
	);
    res.redirect('/');

});

router.post('/experimental', function(req, res, next) {
	for(var i = 0; i < collection.queryArray.length; i++){
		collection.indexing(
			collection.queryArray[i],
			req.body.TFD,
			req.body.IDFD,
			req.body.NormalizationD,
			req.body.TFQ,
			req.body.IDFQ,
			req.body.NormalizationQ);
	}
    res.redirect('/');
});

router.post('/interactive', function(req, res, next) {
	collection.indexing(
		req.body.queryInteractive,
		req.body.TFD,
		req.body.IDFD,
		req.body.NormalizationD,
		req.body.TFQ,
		req.body.IDFQ,
		req.body.NormalizationQ);
    res.redirect('/');
});

module.exports = router;