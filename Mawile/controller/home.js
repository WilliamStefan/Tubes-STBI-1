var express = require('express');
var Collection = require('../lib/Collection');

var router = express.Router();
var collection = new Collection();

router.get('/home', function(req, res) {
	res.render('home');
});

router.post('/indexing', function(req, res) {
	console.log(req.body);
	collection.loadDocuments(req.body.documentLocation);
	collection.loadQueries(req.body.queryLocation);
	collection.loadRelevance(req.body.relevanceLocation);
	collection.loadStopwords(req.body.stopwordLocation);
	collection.processDocuments(req.body.StemmingD);
	collection.createInverted(req.body.TFD, req.body.IDFD);
	collection.experiment(req.body.TFD, req.body.IDFD, req.body.StemmingD, req.body.NormalizationD, req.body.NormalizationQ);
	res.redirect('/home');
});

module.exports = router;