var express = require('express');
var router = express.Router();

// Echo GET
router.get('/:id', function(req, res) {
    id = req.params.id
    res.download('./files/' + id);
});


module.exports = router;
