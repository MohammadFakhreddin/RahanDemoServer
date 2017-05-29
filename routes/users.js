var express = require('express');
var router = express.Router();
const config = require('./../config');
const statusCode = require('./../statusCodes');
const constants = require('./../constants');
var bodyParser = require("body-parser");

router.use(bodyParser.json());
const loggerMeta = {Context: "users"};

var taskItems = [];
taskItems[0] = {
    title: 'تعمیر x',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[1] = {
    title: 'بررسی روزانه بخش Y',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[2] = {
    title: 'رسیدگی به بخش Z',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[3] = {
    title: 'ساخت بخش T',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[4] = {
    title: 'رسیدگی به Y',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[5] = {
    title: 'تعمیر الف',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[6] = {
    title: 'تعمیر ظ',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
taskItems[7] = {
    title: 'ساخت بخش M',
    startDate: new Date(),
    endDate: new Date(),
    description: "تجهیزات بخش X مشکل پیدا کرده اند لطفا بررسی شود",
    taskMode: constants.taskMode.EM,
    attachedLocation: null,
    locationAddress: "ادرس۱/ادرس۲/ادرس۳/ادرس۴",
    hasAttachedLocation: false,
    state: 0
};
router.get('/login', function (req, res, next) {
    res.status(200).json({taskItems: taskItems});
});

module.exports = router;
