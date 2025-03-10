"use strict";
/**
 * Password Field Generator
 * Generates HTML/JSX for password input form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePasswordField = generatePasswordField;
/**
 * Generates a password input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default password value (usually empty)
 * @returns {string} Generated password field JSX
 */
function generatePasswordField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <input\n        type=\"password\"\n        {...register(\"").concat(fieldName, "\")}\n        defaultValue=\"").concat(defaultValue || '', "\"\n        placeholder=\"").concat(((_d = attr.config) === null || _d === void 0 ? void 0 : _d.placeholder) || "Enter ".concat(attr.name.toLowerCase()), "\"\n        className=\"").concat(className, "\"\n        ").concat(isDisabled ? 'disabled' : '', "\n      />\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
