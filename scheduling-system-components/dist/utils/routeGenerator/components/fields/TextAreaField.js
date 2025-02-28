"use strict";
/**
 * Text Area Field Generator
 * Generates HTML/JSX for multiline text input form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTextAreaField = generateTextAreaField;
/**
 * Generates a text area input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default text content
 * @returns {string} Generated text area field JSX
 */
function generateTextAreaField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d, _e;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <textarea\n        {...register(\"").concat(fieldName, "\")}\n        defaultValue=\"").concat(defaultValue || '', "\"\n        rows={").concat(((_d = attr.config) === null || _d === void 0 ? void 0 : _d.rows) || 4, "}\n        placeholder=\"").concat(((_e = attr.config) === null || _e === void 0 ? void 0 : _e.placeholder) || "Enter ".concat(attr.name.toLowerCase()), "\"\n        className=\"").concat(className, "\"\n        ").concat(isDisabled ? 'disabled' : '', "\n      ></textarea>\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
