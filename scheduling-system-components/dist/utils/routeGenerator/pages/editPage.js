"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEditPageWrapper = generateEditPageWrapper;
var editPageComp_1 = require("./pageComponents/editPageComp");
function generateEditPageWrapper(config) {
    return (0, editPageComp_1.generateEditPage)(config);
}
