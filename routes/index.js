// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "calorie manager web service" });
});

module.exports = router;
