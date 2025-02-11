"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewPage = exports.generateEditPage = exports.generateCreatePage = exports.generateListPage = exports.generatePages = void 0;
var listPageComp_1 = require("./pageComponents/listPageComp");
Object.defineProperty(exports, "generateListPage", { enumerable: true, get: function () { return listPageComp_1.generateListPage; } });
var createPageComp_1 = require("./pageComponents/createPageComp");
Object.defineProperty(exports, "generateCreatePage", { enumerable: true, get: function () { return createPageComp_1.generateCreatePage; } });
var editPageComp_1 = require("./pageComponents/editPageComp");
Object.defineProperty(exports, "generateEditPage", { enumerable: true, get: function () { return editPageComp_1.generateEditPage; } });
var viewPageComp_1 = require("./pageComponents/viewPageComp");
Object.defineProperty(exports, "generateViewPage", { enumerable: true, get: function () { return viewPageComp_1.generateViewPage; } });
var generatePages = function (config) { return ({
    list: (0, listPageComp_1.generateListPage)(config),
    create: (0, createPageComp_1.generateCreatePage)(config),
    edit: (0, editPageComp_1.generateEditPage)(config),
    view: (0, viewPageComp_1.generateViewPage)(config)
}); };
exports.generatePages = generatePages;
