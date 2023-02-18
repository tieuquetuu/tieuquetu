const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.send({mess : "hello"})
    // res.render('index', { title: 'Express' });
});

module.exports = router;
