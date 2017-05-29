/**
 * Created by farzan on 10/21/16.
 */
'use strict';
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./RedisConnection').client;
const config = require('../config');
const mongoConnection = require('../Utils/MongooseConnection');
var sessionHandler = null;
if (config.windows == true) {
    var MongoDBStore = require('connect-mongodb-session')(session);
    sessionHandler = session({
        store: new MongoDBStore({uri: "mongodb://localhost:27017/landFight", collection: 'mySessions'}),
        secret: config.sessionSecret,
        maxAge: config.sessionLifeTime,
        resave: true,
        secure: false,//TODO set it to true after enabling https
        saveUninitialized: true,
        signed: true,
        name: config.cookieName
    });
} else {
    sessionHandler = session({
        store: new RedisStore({host: 'localhost', port: 6379, client: redisClient, ttl: config.sessionLifeTime}),
        secret: config.sessionSecret,
        maxAge: config.sessionLifeTime,
        resave: false,
        secure: false,//TODO set it to true after enabling https
        saveUninitialized: false,
        signed: true,
        name: config.cookieName
    });
}

exports.expressSessionMiddeware = sessionHandler;
exports.sioSessionMiddleware = function (socket, next) {
    sessionHandler(socket.request, socket.request.res, next);
};
exports.isSessionCookieSet = function (req) {
    if (req.cookies[config.cookieName])
        return true;
    else
        return false;

};
exports.checkSocketLogin = function (socket, session, onComplete) {
    if (socket.request != null && socket.request.headers != null) {
        socket.request.headers.cookie = session + ";";
    }
    sessionHandler(socket.request, {}, function () {
        onComplete();
    });
};
