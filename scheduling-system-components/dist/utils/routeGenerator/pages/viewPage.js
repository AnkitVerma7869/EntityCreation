"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewPageWrapper = generateViewPageWrapper;
var viewPageComp_1 = require("./pageComponents/viewPageComp");
function generateViewPageWrapper(config) {
    return (0, viewPageComp_1.generateViewPage)(config);
}
