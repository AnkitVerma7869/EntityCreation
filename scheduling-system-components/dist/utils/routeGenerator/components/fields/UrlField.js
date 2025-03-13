"use strict";
/**
 * URL Field Generator
 * Generates HTML/JSX for URL input form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUrlField = generateUrlField;
/**
 * Generates a URL input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default URL value
 * @returns {string} Generated URL field JSX
 */
function generateUrlField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full rounded-r border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"relative flex\">\n        <span className=\"inline-flex items-center px-3 text-sm border-[1.5px] border-r-0 border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white rounded-l\">\n          https://\n        </span>\n        <input\n          type=\"url\"\n          {...register(\"").concat(fieldName, "\")}\n          defaultValue=\"").concat(defaultValue || '', "\"\n          placeholder=\"").concat(((_d = attr.config) === null || _d === void 0 ? void 0 : _d.placeholder) || 'example.com', "\"\n          className=\"").concat(className, "\"\n          ").concat(isDisabled ? 'disabled' : '', "\n        />\n      </div>\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
