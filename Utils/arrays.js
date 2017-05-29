/**
 * Created by M.Fakhreddin on 9/11/2016.
 */
var array = {};
array.contains = function (arr, mem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == mem) {
            return true;
        }
    }
    return false
};

array.remove = function (arr, mem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == mem) {
            arr.splice(i, 1);
            return true;
        }
    }
    return false;
};

module.exports = array;