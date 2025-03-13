"use strict";
/**
 * Checkbox Field Generator
 * Generates HTML/JSX for checkbox form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCheckboxField = generateCheckboxField;
/**
 * Generates a checkbox field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default checked values (comma-separated)
 * @returns {string} Generated checkbox field JSX
 */
function generateCheckboxField(attr, fieldName, defaultValue) {
    var _a, _b, _c;
    var defaultValues = defaultValue ? defaultValue.split(',').map(function (v) { return v.trim(); }) : [];
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "mr-3 h-5 w-5 cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"flex flex-wrap gap-6\">\n        ").concat((attr.options || []).map(function (option) { return "\n          <label className=\"flex items-center min-w-[120px] text-sm font-medium text-black dark:text-white\">\n            <input\n              type=\"checkbox\"\n              {...register(\"".concat(fieldName, "\")}\n              value=\"").concat(option.value, "\"\n              defaultChecked={").concat(defaultValues.includes(option.value) ? 'true' : 'false', "}\n              className=\"").concat(className, "\"\n              ").concat(isDisabled ? 'disabled' : '', "\n            />\n            ").concat(option.label, "\n          </label>\n        "); }).join(''), "\n      </div>\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
