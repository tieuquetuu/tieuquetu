const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const NextApp = require('./next-app')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
const { Telegraf } = require('telegraf')
const { telegramBotToken } = require('./inc/config')

// Routes
const indexRouter = require('./routes/index')
const nextRouter = require('./routes/next-router')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const bot = new Telegraf( telegramBotToken )
// const bot = new TelegramBot(telegramBotToken , { polling: true })

bot.start((ctx) => ctx.reply("Wellcome"))
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("🐶"));
bot.on("message", async (ctx) => {

    console.log(ctx.from)
    const message = ctx.update.message.text;
    if (message.match(/hello/)) {
        ctx.reply("Xin chào");
    } else {
        ctx.reply("Hong hiểu...");
    }
});
bot.launch().then(() => console.log("bot is running"))
/*bot.launch().then(()=>{

    console.log("Telegram bot đã chạy !!!")

    app.get('/', function(req, res, next) {
        res.send("Bot is running")
    })
})*/

// Khởi tạo server nextjs
NextApp.prepare().then(() => {
    app.use(nextRouter)
})

module.exports = app