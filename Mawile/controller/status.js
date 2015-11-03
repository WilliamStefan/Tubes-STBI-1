var express = require('express');

var router = express.Router();

router.get('/status', function(req, res) {
	res.render('pages/status');
});

module.exports = router;