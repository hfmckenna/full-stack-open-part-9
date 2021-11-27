"use strict";
exports.__esModule = true;
exports.logError = exports.logInfo = void 0;
var logInfo = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV !== "test") {
        console.log.apply(console, params);
    }
};
exports.logInfo = logInfo;
var logError = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    if (process.env.NODE_ENV !== "test") {
        console.error.apply(console, params);
    }
};
exports.logError = logError;
module.exports = {
    logInfo: exports.logInfo,
    logError: exports.logError
};
