const express = require('express');
const NextApp = require('../next-app');
const handle = NextApp.getRequestHandler()
let router = express.Router();

router.all('*', function(req, res, next) {
    const { params, query, path, hostname, originalUrl, headers } = req;
    // if (path.includes('/_next/')) return next()
    return next();
}, (req, res, next)=>{
    return handle(req, res);
})

module.exports = router