"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewPage = exports.generateEditPage = exports.generateCreatePage = exports.generateListPage = exports.generatePages = void 0;
var listPage_1 = require("./listPage");
Object.defineProperty(exports, "generateListPage", { enumerable: true, get: function () { return listPage_1.generateListPage; } });
var createPage_1 = require("./createPage");
Object.defineProperty(exports, "generateCreatePage", { enumerable: true, get: function () { return createPage_1.generateCreatePage; } });
var editPage_1 = require("./editPage");
Object.defineProperty(exports, "generateEditPage", { enumerable: true, get: function () { return editPage_1.generateEditPage; } });
var viewPage_1 = require("./viewPage");
Object.defineProperty(exports, "generateViewPage", { enumerable: true, get: function () { return viewPage_1.generateViewPage; } });
var generatePages = function (config) { return ({
    list: (0, listPage_1.generateListPage)(config),
    create: (0, createPage_1.generateCreatePage)(config),
    edit: (0, editPage_1.generateEditPage)(config),
    view: (0, viewPage_1.generateViewPage)(config)
}); };
exports.generatePages = generatePages;
