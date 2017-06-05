'use strict';
var express = require('express');
var router = express.Router();
const config = require('./../config');
const StatusCodes = require('./../statusCodes');
const constants = require('./../constants');
var bodyParser = require("body-parser");
var AllSchema = require("../schemas/UserSchema");
var UserSchema = AllSchema.User;
var TaskSchema = AllSchema.Task;
var Verify = require("./verify");
var Passhash = require("./../Utils/passHash");
router.use(bodyParser.json());
const loggerMeta = {Context: "users"};


function userFound(req, res, user) {
    TaskSchema.find({department: user.department}, function (err, taskList) {
        if (err) {
            throw err;
        }
        console.log("Login successful for " + user.username, loggerMeta);
        if (req.session == null) {
            req.session = {}
        }
        req.session.user = user.sessionV0;
        req.session.appVersion = req.body.appVersion;
        res.status(StatusCodes.OK).json({
            user: user,
            optionalTasks: taskList,
        });
    });
}

function missingParam(res) {
    res.status(StatusCodes.MISSING_PARAM).json();
}

router.post('/login', function (req, res, next) {
    // res.status(200).json({taskItems: taskItems});
    var username = req.body.username;
    var password = req.body.password;
    var department = req.body.department;
    if (username == null || password == null || department == null) {
        missingParam(res);
        return;
    }
    UserSchema.findOne({username: username, department: department}, function (err, user) {
        if (err)throw err;
        if (user == null) {
            res.status(StatusCodes.USER_NOT_FOUND).json();
        } else {
            Passhash.compare(password, user.password, function (err, result) {
                if (err) {
                    throw err;
                }
                if (result) {
                    userFound(req, res, user);
                } else {
                    res.status(StatusCodes.WRONG_PASSWORD).json();
                }
            });
        }
    });
    console.log("New user with name " + req.body.username + "has requested", loggerMeta)
});

router.get('/', function (req, res, next) {
    UserSchema.find({}, function (err, users) {
        if (err)throw err;
        res.status(200).json(users);
    });
});

router.get('/currentUser', Verify.verifyUser, function (req, res, next) {
    var userId = req.session.user._id;
    var appVersion = req.session.appVersion;
    if (userId == null) {
        res.status(StatusCodes.USER_NOT_FOUND).json();
        return;
    }
    UserSchema.findOne(userId, function (err, user) {
        if (err)throw err;
        if (user) {
            userFound(req, res, user);
        } else {
            res.status(StatusCodes.USER_NOT_FOUND).json({});
        }
    });
});


module.exports = router;
