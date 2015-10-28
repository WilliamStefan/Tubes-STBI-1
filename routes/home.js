/**
 * Created by henry on 19/10/2015.
 */

var express = require('express');
var router = express.Router();
var global = require('./global');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});
router.post('/indexing', function(req, res, next) {
	global.collection.loadDocuments(req.body.docLocation);
	global.collection.loadQrels(req.body.relLocation);
	global.collection.loadQuery(req.body.queryLocation);
	global.collection.loadStopWords(req.body.stopwordLocation);
	global.collection.processData();
	global.collection.countIdf();
	global.collection.countRecallPrecision();
	global.collection.createInvertedFile(
		req.body.TFD,
		req.body.IDFD,
		req.body.NormalizationD
	);
    res.redirect('/');

});

router.post('/experimental', function(req, res, next) {
	for(var i = 0; i < collection.queryArray.length; i++){
		global.collection.indexing(
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