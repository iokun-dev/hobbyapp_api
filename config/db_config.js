require('dotenv').config({
    path: `./env/${process.env.NODE_ENV || 'development'}.env`,
  });

//require mongoose module
var mongoose = require('mongoose');

//require chalk module to give colors to console text
var chalk = require('chalk');

//require database URL from env file
const { DBURL } = process.env;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function and imported by server
module.exports =function(){

    const options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
    mongoose.connect(DBURL, options);
    
    mongoose.connection.on('connected', function(){
        console.log(connected(`Mongoose default connection is open to `, DBURL));
    });

    mongoose.connection.on('error', function(err){
        console.log(error(`Mongoose default connection has occured ${err} error`));
    });

    mongoose.connection.on('disconnected', function(){
        console.log(disconnected(`Mongoose default connection is disconnected`));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination(`Mongoose default connection is disconnected due to application termination`));
            process.exit(0)
        });
    });
}();