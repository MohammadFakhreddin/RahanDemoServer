/**
 * Created by farzan on 10/21/16.
 */
const redis = require('redis');
var config = require('../config');
var redisClient = null;

if (!config.windows) {
    redisClient = redis.createClient();
    redisClient.on('ready', function () {
        console.log('Redis Connected', loggerMeta);
    });
}
exports.client = redisClient;