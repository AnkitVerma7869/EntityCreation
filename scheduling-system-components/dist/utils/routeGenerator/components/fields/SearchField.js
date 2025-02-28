"use strict";
/**
 * Search Field Generator
 * Generates HTML/JSX for search input form fields with search icon
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSearchField = generateSearchField;
/**
 * Generates a search input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default search value
 * @returns {string} Generated search field JSX with icon
 */
function generateSearchField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 pl-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"relative\">\n        <input\n          type=\"search\"\n          {...register(\"").concat(fieldName, "\")}\n          defaultValue=\"").concat(defaultValue || '', "\"\n          placeholder=\"").concat(((_d = attr.config) === null || _d === void 0 ? void 0 : _d.placeholder) || "Search ".concat(attr.name.toLowerCase()), "\"\n          className=\"").concat(className, "\"\n          ").concat(isDisabled ? 'disabled' : '', "\n        />\n        <span className=\"absolute left-4 top-4\">\n          <svg\n            className=\"fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary\"\n            width=\"16\"\n            height=\"16\"\n            viewBox=\"0 0 16 16\"\n            fill=\"none\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n          >\n            <path\n              d=\"M15.7 14.3L12.3 10.9C13.4 9.6 14 7.9 14 6C14 2.7 11.3 0 8 0C4.7 0 2 2.7 2 6C2 9.3 4.7 12 8 12C9.9 12 11.6 11.4 12.9 10.3L16.3 13.7C16.5 13.9 16.8 14 17 14C17.2 14 17.5 13.9 17.7 13.7C18.1 13.3 18.1 12.7 17.7 12.3ZM4 6C4 3.8 5.8 2 8 2C10.2 2 12 3.8 12 6C12 8.2 10.2 10 8 10C5.8 10 4 8.2 4 6Z\"\n            />\n          </svg>\n        </span>\n      </div>\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
