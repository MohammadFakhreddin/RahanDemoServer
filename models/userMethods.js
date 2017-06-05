/**
 * Created by Mohammad.Fakhreddin on 05/06/2017.
 */
'use strict';
var PassHash = require('./../Utils/passHash');
var user = {};
var AllSchemas = require('./../schemas/UserSchema');
var UserSchema = AllSchemas.User;
var TaskSchema = AllSchemas.Task;
var constants = require('./../constants');
const loggerMeta = {context: "userMethods"};
var shortId = require('shortid');

var taskItems = [];

taskItems[0] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'تعمیر x',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[1] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'بررسی روزانه بخش Y',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[2] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'رسیدگی به بخش Z',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[3] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'ساخت بخش T',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[4] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'رسیدگی به Y',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[5] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'تعمیر الف',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
taskItems[6] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'تعمیر ظ',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1

});
taskItems[7] = new TaskSchema({
    // scId: shortId.generate(),
    title: 'ساخت بخش M',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: constants.taskState.TODO,
    canReAssign: false,
    department: constants.department.RAIL1
});
user.createNewUser = function (username, password, department, callback) {
    PassHash.hash(password, function (err, hash) {
        if (err) {
            callback(false);
            throw err;
        }
        var newUser = new UserSchema({
            username: username,
            password: hash,
            department: department,
            tasks: taskItems
        });
        newUser.save(function (err) {
            if (err) {
                // callback(false);
                throw err;
            }
            callback(true);
        });
    });
};

module.exports = user;
