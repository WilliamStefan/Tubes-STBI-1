/**
 * Created by henry on 19/10/2015.
 */

var express = require('express');
var router = express.Router();
var global = require('./global');

var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home');
});

router.post('/indexing', function(req, res, next) {
	// console.log(global.collection);
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
	for(var i = 0; i < global.collection.queryArray.length; i++){
		global.collection.indexing(
			global.collection.queryArray[i],
			req.body.TFD,
			req.body.IDFD,
			req.body.NormalizationD,
			req.body.TFQ,
			req.body.IDFQ,
			req.body.NormalizationQ);
	}
    var JSONstr = "{\"data\": [";
	
	for(var i=0; i<global.collection.queryArray.length - 1; i++) {
		JSONstr += "{";
		JSONstr += "\"recall\": " + global.collection.recall[i] + ", ";
		JSONstr += "\"precision\": " + global.collection.precision[i] + ", ";
		JSONstr += "\"niap\":" + global.collection.interpolatedPrecision[i] + "}, ";
	}
	JSONstr += "{\"recall\": " + global.collection.recall[global.collection.recall.length - 1] + ", ";
	JSONstr += "\"precision\": " + global.collection.precision[global.collection.recall.length - 1] + ", ";
	JSONstr += "\"niap\": " + global.collection.interpolatedPrecision[global.collection.recall.length - 1] + "}]}";
		
	var JSONobj = JSON.parse(JSONstr);

	// console.log("JSONobj: " + JSONobj);
	
	res.render('tes', JSONobj);
 });

app.get('/experimental', function(req, res, next) {
	console.log('experimental');
	res.redirect('/tes');
});

router.post('/interactive', function(req, res, next) {
	global.collection.indexing(
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