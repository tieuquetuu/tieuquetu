const path = require('path');
const utils = require('./utils');
require('dotenv').config();

let config = {};

const dev = process.env.NODE_ENV !== 'production'

const hostname = 'localhost'

const dir = path.join(__dirname, '../');

const port = utils.normalizePort(process.env.PORT || 3000 );

// const WPGraphqlAPIUrl = process.env.WPGRAPHQL_API_URL;

const telegramBotToken = process.env.BOT_TELEGRAM_TOKEN;

const domainToListening = [
    /*{
        hostname: "drinkocany.com",
    },
    {
        hostname: "dev.drinkocany.com",
    },
    {
        hostname: "casting.drinkocany.com",
        routes: {

        }
    },*/
    {
        hostname: "localhost:3000",
    },
]

config = {
    telegramBotToken,
    dev,
    hostname,
    dir,
    port,
    // WPGraphqlAPIUrl
}

module.exports = config;