"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHiddenField = generateHiddenField;
function generateHiddenField(attr, fieldName, defaultValue) {
    return "\n    <input\n      type=\"hidden\"\n      {...register(\"".concat(fieldName, "\")}\n      defaultValue=\"").concat(defaultValue || '', "\"\n    />\n  ");
}
