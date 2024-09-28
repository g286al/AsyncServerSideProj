// Gal Natan 205890569
// Eliran Kotzero 316040120
// Mattan Ben Yosef 318360351

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const developers = [
        { firstname: 'Gal', lastname: 'Natan', id: 205890569, email: 'Gal.natan10@gmail.com' },{ firstname: 'Eliran', lastname: 'Kotzero', id: 316040120, email: 'eliran4142@gmail.com' },{ firstname: 'Mattan', lastname: 'Ben Yosef', id: 318360351, email: 'matbeyo@gmail.com' }
    ];
    // Return the developers as JSON
    res.json(developers);
});

module.exports = router;