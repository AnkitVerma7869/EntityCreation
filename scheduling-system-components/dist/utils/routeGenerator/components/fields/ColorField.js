"use strict";
/**
 * Color Field Generator
 * Generates HTML/JSX for color picker form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateColorField = generateColorField;
/**
 * Generates a color picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default color value (hex format)
 * @returns {string} Generated color picker field JSX
 */
function generateColorField(attr, fieldName, defaultValue) {
    var _a, _b, _c;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "h-10 w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <input\n        type=\"color\"\n        {...register(\"").concat(fieldName, "\")}\n        defaultValue=\"").concat(defaultValue || '#000000', "\"\n        className=\"").concat(className, "\"\n        ").concat(isDisabled ? 'disabled' : '', "\n      />\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
