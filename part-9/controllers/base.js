"use strict";
exports.__esModule = true;
var express_1 = require("express");
var baseRouter = express_1["default"].Router();
baseRouter.get('/', function (_req, res) {
    console.log('someone pinged here');
    res.send('pong');
});
exports["default"] = baseRouter;
