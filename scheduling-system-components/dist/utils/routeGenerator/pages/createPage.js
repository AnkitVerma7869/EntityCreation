"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreatePageWrapper = generateCreatePageWrapper;
var createPageComp_1 = require("./pageComponents/createPageComp");
function generateCreatePageWrapper(config) {
    return (0, createPageComp_1.generateCreatePage)(config);
}
