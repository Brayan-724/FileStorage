const express = require('express');
const router = express.Router();

exports = module.exports = function() {
	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index');
	});
};

exports.r = router;
exports.thisRoute = "/";
exports.allRoutes = [""];
