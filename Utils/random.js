/**
 * Created by M.Fakhreddin on 10/3/2016.
 */
var random = {};
//Generates a random number between low(Inclusive) and high(Inclusive)
random.range = function (low, high) {
    return Math.round(Math.random() * (high - low) + low);
};
//Random number which is not a particular number 
random.rangeExcept = function (low, high, except) {
    var num = random.range(low, high);
    num = Math.round(num);
    var exists = true;
    while (exists) {
        exists = false;
        for (var i = 0; i < except.length; i++) {
            if (except[i] == num) {
                exists = true;
                break;
            }
        }
        if (exists) {
            num = random.range(low, high);
        }
    }
    return num;
};
module.exports = random;