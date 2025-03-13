"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateListPageWrapper = generateListPageWrapper;
var listPageComp_1 = require("./pageComponents/listPageComp");
function generateListPageWrapper(config) {
    return (0, listPageComp_1.generateListPage)(config);
}
