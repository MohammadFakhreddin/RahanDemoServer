/**
 * Created by M.Fakhreddin on 04/06/2017.
 */
var config = require("./../config");
var sessionStore = require('../Utils/SessionStore');
var loggerMeta = {Context: "verify"};


exports.verifyUser = function (req, res, next) {
    if (req.session && req.session.user && req.session.user._id) {
        next();
    } else {
        var err;
        if (sessionStore.isSessionCookieSet(req)) {
            console.log("You are not authenticated!", loggerMeta);
            err = new Error("You are not authenticated!");
            err.status = 401;
            return next(err);
        } else {
            console.log("No token Provided", loggerMeta);
            err = new Error("No token provided");
            err.status = 403;
            return next(err);
        }
    }
};