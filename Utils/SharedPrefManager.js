/**
 * Created by M.Fakhreddin on 3/16/2017.
 */
var fs = require("fs");
var JSON = require("JSON");
const config = require("./../config");

var contents = null;
var path = null;

if (config.type === "dev") {
    path = "../DB/sharedPrefs.json";
} else {
    path = "/root/serverFiles/LandFight/DB/sharedPrefs.json";
}

var readFile = function () {
    if (contents == null) {
        var rawContents = fs.readFileSync(path, 'utf8');
        if (rawContents == "") {
            console.log("Initializing sharedPrefs for first time");
            contents = {};
        } else {
            contents = JSON.parse(rawContents);
        }
    }
    return contents;
};

var writeFile = function () {
    fs.writeFileSync(path, JSON.stringify(contents));//, function (err) {
    //fs.writeFile(path, contents, 'utf8', function (err) {
    //    if (err) throw err;
    //});
};

exports.getInt = function (key) {
    readFile();
    if (contents[key] != null) {
        return parseInt(contents[key]);
    }
    console.error("Sending default data");
    return 0;
};

exports.getString = function (key) {
    readFile();
    if (contents[key] != null) {
        return contents[key];
    }
    return "";
};

exports.getLong = function (key) {
    readFile();
    if (contents[key] != null) {
        return Number(contents[key]);
    }
    return 0;
};


exports.putString = function (key, value) {
    readFile();
    contents[key] = value;
    writeFile();
};

exports.putInt = function (key, value) {
    readFile();
    contents[key] = value;
    writeFile();
};

exports.putLong = function (key, value) {
    readFile();
    contents[key] = value;
    writeFile();
};
