'use strict';
const mongoose = require('mongoose');
const config = require("../config");
//var winston = require("winston");
mongoose.connect(config.mongoUrl);

var loggerMeta = {Context: "MongooseConnection", Function: ""};

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb Connection error"));
db.once("open", function () {
    //We are connected
    console.log("Connection to MongoDB is successful", loggerMeta);
});
exports.connection = db;
