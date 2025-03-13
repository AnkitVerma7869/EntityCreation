"use strict";
/**
 * Hidden Field Generator
 * Generates HTML/JSX for hidden input form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHiddenField = generateHiddenField;
/**
 * Generates a hidden input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default field value
 * @returns {string} Generated hidden field JSX
 */
function generateHiddenField(attr, fieldName, defaultValue) {
    var _a;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    return "\n    <input\n      type=\"hidden\"\n      {...register(\"".concat(fieldName, "\")}\n      defaultValue=\"").concat(defaultValue || '', "\"\n      ").concat(isDisabled ? 'disabled' : '', "\n    />\n  ");
}
