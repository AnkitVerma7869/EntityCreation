"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHiddenField = generateHiddenField;
function generateHiddenField(attr, fieldName) {
    return "\n    <input\n      type=\"hidden\"\n      {...register(\"".concat(fieldName, "\")}\n      value=\"").concat(attr.defaultValue || '', "\"\n    />\n  ");
}
