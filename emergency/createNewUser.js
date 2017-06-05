/**
 * Created by M.Fakhreddin on 05/06/2017.
 */
const mongoose = require('mongoose');
const config = require("../config");
var userMethods = require("./../models/userMethods");
mongoose.connect(config.mongoUrl);
var constants = require('./../constants');

var username = "";
var password = 0;
var department = 0;
const readline = require("readline");
const readlineInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb Connection error"));
db.once("open", function () {
    readlineInstance.question("username:", function (answer) {
        username = answer;
        readlineInstance.question("password:", function (answer) {
            password = answer;
            readlineInstance.question("department:", function (answer) {
                try {
                    var department = parseInt(answer);
                    if (department !== constants.department.RAIL1 && department !== constants.department.RAIL2) {
                        throw new Error("no valid number");
                    }
                    userMethods.createNewUser(username, password, department, function (isSuc) {
                        if (isSuc === true) {
                            console.log("Creating new user is successful");
                            process.exit(0);
                        } else {
                            throw new Error("Creating user failed");
                        }
                    });
                } catch (e) {
                    console.error("department must be int");
                    process.exit(0)
                }
            });
        });
    });
});


