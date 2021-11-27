"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http_1 = require("http");
var config_1 = require("./utils/config");
var logger_1 = require("./utils/logger");
var server = http_1["default"].createServer(app_1["default"]);
server.listen(config_1.PORT, function () {
    (0, logger_1.logInfo)("Server running on port ".concat(config_1.PORT));
});
