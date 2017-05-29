/**
 * Created by farzan on 10/21/16.
 */
const redis = require('redis');
var config = require('../config');
var redisClient = null;
var winston = require("winston");

var fileConsoleLogger = winston.loggers.get('FileConsoleLogger');
var fileLogger = winston.loggers.get('FileLogger');
var loggerMeta = {Context: "RedisConnection", Function: ""};

if (!config.windows) {
    redisClient = redis.createClient();
    redisClient.on('ready', function () {
        console.log('Redis Connected', loggerMeta);
    });
}
exports.client = redisClient;