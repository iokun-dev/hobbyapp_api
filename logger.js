const morgan = require('morgan');
const fs = require('fs')
const path = require('path')

var logDirectory = path.join(__dirname, 'log')
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })

// setup the logger
const logger = morgan('dev', { stream: accessLogStream }) //set dev to 'combined' for production

module.exports = logger;