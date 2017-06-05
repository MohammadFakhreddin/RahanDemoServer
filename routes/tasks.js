/**
 * Created by M.Fakhreddin on 05/06/2017.
 */
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
router.use(bodyParser.json());
const loggerMeta = {Context: "tasks"};

function missingParam(res) {
    res.status(StatusCodes.MISSING_PARAM).json();
}

router.get('acceptTask/:taskId', Verify.verifyUser, function (req, res, next) {
    var userId = req.session.user._id;
    var department = req.session.user.department;
    var taskId = req.params.taskId;
    if (userId == null || department == null || taskId == null) {
        missingParam(res);
        return;
    }
    UserSchema.findById(userId, function (err, user) {
        if (err)throw err;
        if (user) {
            TaskSchema.findByIdAndRemove(taskId, function (err, task) {
                if (err) throw err;
                if (task) {
                    user.tasks.push(task);
                    UserSchema.findByIdAndUpdate(userId, {$set: {tasks: user.tasks}}, function (err, result) {
                        if (err)throw err;
                        if (result) {
                            res.status(StatusCodes.OK).json();
                        } else {
                            res.status(StatusCodes.INTERNAL).json();
                        }
                    })
                } else {
                    res.status(StatusCodes.TASK_NOT_FOUND).json();
                }
            });
        } else {
            res.status(StatusCodes.USER_NOT_FOUND).json();
        }
    });
});

router.get('giveUpTask/:taskId', Verify.verifyUser, function (req, res, next) {
    var userId = req.session.user._id;
    var department = req.session.user.department;
    var taskId = req.params.taskId;
    if (userId == null || department == null || taskId == null) {
        missingParam(res);
        return;
    }
    UserSchema.findById(userId, function (err, user) {
        if (err)throw err;
        if (user) {
            var cTask = null;
            for (var i = 0; i < user.tasks.length; i++) {
                if (user.tasks[i]._id.toString() === taskId.toString()) {
                    cTask = user.tasks[i];
                    user.tasks.splice(i, 1);
                }
            }
            if (cTask == null) {
                res.status(StatusCodes.TASK_NOT_FOUND).json();
                return;
            }
            if (cTask.canReAssign === true) {
                UserSchema.findByIdAndUpdate(userId, {$set: {tasks: user.tasks}}, function (err, result) {
                    if (err)throw err;
                    if (!result) {
                        res.status(StatusCodes.INTERNAL).json();
                    } else {
                        TaskSchema.findByIdAndUpdate(taskId, cTask, function (err, result) {
                            if (err)throw err;
                            res.status(200).json();
                        });
                    }
                });
            } else {
                res.status(StatusCodes.GIVEUP_TASK_UNAVAILABLE).json();
            }
            // TaskSchema.findByIdAndRemove(taskId, function (err, task) {
            //     if (err) throw err;
            //     if (task) {
            //         user.tasks.push(task);
            //         UserSchema.findByIdAndUpdate(userId, {$set: {tasks: user.tasks}}, function (err, result) {
            //             if (err)throw err;
            //             if (result) {
            //                 res.status(StatusCodes.OK).json();
            //             } else {
            //                 res.status(StatusCodes.INTERNAL).json();
            //             }
            //         })
            //     } else {
            //         res.status(StatusCodes.TASK_NOT_FOUND).json();
            //     }
            // });
        } else {
            res.status(StatusCodes.USER_NOT_FOUND).json();
        }
    });
});

module.exports = router;