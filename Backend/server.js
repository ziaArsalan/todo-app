const http = require('http')
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const logger = require('morgan')
const config = require('./config/config')
const path = require('path')

const app = express()

app.use(compression())

// Cross Origin
app.use(cors())
app.options('*', cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,x-auth-user,x-amz-meta-fieldname,x-auth-token,brand-folder')
    next()
})

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

// Logging Request
app.use(logger(config.log))

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log('server listening at', config.port, 'at environment', process.env.NODE_ENV);
})

const endpoints = require('./src/index')
endpoints(app)


// Unhandeled Errors
process.on('unhandledRejection', (err) => {
    console.log('Unhandeled Rejection\n ', err)
})