'use strict';
/**
 * Created by M.Fakhreddin on 1/19/2017.
 */
var userDB = require("./../mongooseModels/user").User;
var winston = require("winston");
var config = require("./../config");
var spawn = require('child_process').spawn;
var fs = require('fs');
var JSON = require("JSON");
var db = require("./../models/clientDatabase");
const passHash = require('../Utils/passHash');
var userMethods = require('../models/userMethods');
var socketServer = require("../socketIo/RequestFindGameServer");
var loggerMeta = {Context: "Executor", Function: ""};
var Random = require("./../Utils/random");

var Executor = {};
var botUsersList = [];
var botNameAt = 0;//Which name going to be given to thi bot
var botNumAt = 6;//Which ai is going to be executed
Executor.childLifeTime = 12 * 60 * 1000;
var botNamesAddress = "";
var availableBots = [2, 5, 6];

if (config.windows == true) {
    Executor.childAddress = 'D:\\Documents\\Visual Studio 2012\\Projects\\LandFightBotReborn\\LandFightBotReborn\\bin\\' +
        'Debug\\LandFightBotReborn.exe';
} else {
    //noinspection SpellCheckingInspection
    Executor.childAddress = "/root/serverFiles/landfightbot/LandFightBotReborn/bin/Debug/LandFightBotReborn.exe";
}

if (config.type == "dev") {
    botNamesAddress = "../DB/bot_names.json";
} else {
    botNamesAddress = "/root/serverFiles/LandFight/DB/bot_names.json";
}

var loadBotList = function (callback) {
    function addUsersToBotList(users) {
        for (var i = 0; i < users.length; i++) {
            botUsersList.push(users[i]);
        }
    }

    if (botUsersList != null && botUsersList.length > 0) {
        callback();
    } else {
        //noinspection JSUnresolvedFunction
        userDB.find({'usingAsBotIsValid': true}, function (err, users) {
            if (err) {
                throw err;
            }
            if (users != null && users.length > 10) {
                addUsersToBotList(users);
                callback();
            } else {
                fs.readFile(botNamesAddress, 'utf8', function (err, rawData) {
                    if (err) {
                        console.error("error in Get to bot names", loggerMeta);
                        throw err;
                    }
                    var botNameList = JSON.parse(rawData);
                    var i = 0;

                    function doNext() {
                        if (i < botNameList.length) {
                            var botName = botNameList[i];
                            var password = userMethods.generateUniqueID();
                            //noinspection JSUnresolvedFunction
                            userDB.findOne({username: botName}, function (err, user) {
                                if (err) {
                                    console.error("Error in reading user ", loggerMeta);
                                    throw err;
                                }
                                if (user == null) {
                                    userMethods.createNewUser(botName, password, db.generateStartingUnits(), true, function (success, user) {
                                        if (success) {
                                            i++;
                                            doNext();
                                        } else {
                                            console.error("Creating new bot user failed", loggerMeta);
                                        }
                                    });
                                } else {
                                    user.usingAsBotIsValid = true;
                                    user.lastTimeUsedAsBot = new Date();
                                    //noinspection JSUnresolvedFunction
                                    userDB.findByIdAndUpdate(user._id, user, function (err, user) {
                                        if (err) {
                                            console.error("Error in updating user");
                                            throw new err;
                                        }
                                        i++;
                                        doNext();
                                    })
                                }
                            })
                        } else {
                            loadBotList(callback);
                        }
                    }

                    doNext();
                });
            }
        });
    }
};


var executeNewBot = function (username, password) {
    loggerMeta.Function = "executeNewBot";
    var child = null;
    if (username != "" && password != "") {
        var args = [];
        args.push(botNumAt);
        args.push(username);
        args.push(password);
        child = spawn(Executor.childAddress, args);
        var selectIndex = Random.range(0, availableBots.length - 1);
        botNumAt = availableBots[selectIndex];
    } else {
        child = spawn(Executor.childAddress);
    }
    child.stdout.on('data', function (data) {
        loggerMeta.Function = "createChild";
        //console.log('Bot: ' + data, loggerMeta);
        loggerMeta.Function = "";
    });

    child.stderr.on('data', function (data) {
        loggerMeta.Function = "createChild";
        console.log('Bot: ' + data, loggerMeta);
        loggerMeta.Function = "";
    });

    child.on('close', function (code) {
        loggerMeta.Function = "createChild";
        console.log('Bot process exited with code ' + code, loggerMeta);
        loggerMeta.Function = "";
    });
    setTimeout(function () {
        loggerMeta.Function = "createChild";
        child.kill('SIGINT');
        console.log("Killing child process", loggerMeta);
        loggerMeta.Function = "";

    }, Executor.childLifeTime);
    loggerMeta.Function = "";

};

exports.signalToCreateNewBot = Executor.signalToCreateNewBot = function () {
    loadBotList(function () {
        if (botUsersList == null || botUsersList.length == 0) {
            throw new Error("No bot D:");
        } else {
            botNameAt = Random.rangeExcept(0, botUsersList.length - 1, botNameAt);//Not last user but randomly chosen
            executeNewBot(botUsersList[botNameAt].username, botUsersList[botNameAt].password);
        }
    });
};

module.exports = Executor;

