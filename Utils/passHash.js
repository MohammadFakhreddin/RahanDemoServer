'use strict';


const config = require('../config');
var bcrypt = null;
if (config.windows)
    bcrypt = require('bcryptjs');//bcryptjs calculation is implmented with js so it is so slow for production
else
    bcrypt = require('bcrypt');
exports.hash = function (pass, cb) {
    bcrypt.hash(pass, config.bcryptRounds, function (err, hash) {
        cb(err, hash);
    });

};

exports.compare = function (data, hash, cb) {
    bcrypt.compare(data, hash, function (err, res) {
        cb(err, res);
    })
};
