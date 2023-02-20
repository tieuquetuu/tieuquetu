const path = require('path')
const Next = require('next')
const conf = require('./next.config')
require('dotenv').config()

const { dev, hostname, port, dir } = require('./inc/config')

const options = {
    customServer: true,
    dev,
    port,
    hostname,
    dir
}

const NextApp = Next(options)

module.exports = NextApp;