var express = require('express');
var router = express.Router();

var test

// Echo GET
router.get('/', function(req, res) {
    res.send(test);
});

// Echo PUT
router.put('/', function(req, res) {
    test = req.body.text;

    res.send(req.body.text);
});

module.exports = router;
