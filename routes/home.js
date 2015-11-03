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

var masak = [];
router.post('/indexing', function(req, res, next) {
	// console.log(global.collection);
	global.collection.loadDocuments(req.body.docLocation);
	global.collection.loadQrels(req.body.relLocation);
	global.collection.loadQuery(req.body.queryLocation);
	global.collection.loadStopWords(req.body.stopwordLocation);
	global.collection.processData();
	global.collection.countIdf();
	global.collection.createInvertedFile(
		req.body.IDFD,
		req.body.TFD,
		req.body.NormalizationD
	);
	masak[0] = req.body.IDFD;
	masak[1] = req.body.TFD;
	masak[2] = req.body.NormalizationD;
	masak[3] = req.body.IDFQ;
	masak[4] = req.body.TFQ;
	masak[5] = req.body.NormalizationQ;
	global.collection.countRecallPrecision();
	res.redirect('/');
});

router.post('/experimental', function(req, res, next) {
	for(var i = 0; i < global.collection.queryArray.length; i++){
		global.collection.indexing(
			global.collection.queryArray[i],
			// req.body.IDFD,
			// req.body.TFD,
			// req.body.NormalizationD,
			// req.body.IDFQ,
			// req.body.TFQ,
			// req.body.NormalizationQ);
			masak[0],
			masak[1],
			masak[2],
			masak[3],
			masak[4],
			masak[5]);
	}
 //    var JSONstr = "{\"data\": [";
	
	// for(var i=0; i<global.collection.queryArray.length - 1; i++) {
	// 	JSONstr += "{";
	// 	JSONstr += "\"recall\": " + global.collection.recall[i] + ", ";
	// 	JSONstr += "\"precision\": " + global.collection.precision[i] + ", ";
	// 	JSONstr += "\"niap\":" + global.collection.interpolatedPrecision[i] + "}, ";
	// }
	// JSONstr += "{\"recall\": " + global.collection.recall[global.collection.recall.length - 1] + ", ";
	// JSONstr += "\"precision\": " + global.collection.precision[global.collection.recall.length - 1] + ", ";
	// JSONstr += "\"niap\": " + global.collection.interpolatedPrecision[global.collection.recall.length - 1] + "}]}";
		
	// var JSONobj = JSON.parse(JSONstr);

	// console.log("JSONobj: " + JSONobj);
	
	// res.render('tes', {data :JSONstr});
	res.redirect('/');
 });

// app.get('/experimental', function(req, res, next) {
// 	console.log('experimental');
// 	res.redirect('/tes');
// });

router.post('/interactive', function(req, res, next) {
	console.log(req.body);
	global.collection.indexing2(
		req.body.queryInteractive,
			// req.body.IDFD,
			// req.body.TFD,
			// req.body.NormalizationD,
			// req.body.IDFQ,
			// req.body.TFQ,
			// req.body.NormalizationQ);
			masak[0],
			masak[1],
			masak[2],
			masak[3],
			masak[4],
			masak[5]);
    res.redirect('/');
});

module.exports = router;