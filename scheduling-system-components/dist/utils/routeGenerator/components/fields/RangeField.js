"use strict";
/**
 * Range Field Generator
 * Generates HTML/JSX for range slider form fields
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRangeField = generateRangeField;
/**
 * Generates a range slider component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default slider value
 * @returns {string} Generated range slider JSX
 */
function generateRangeField(attr, fieldName, defaultValue) {
    var _a, _b, _c;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full cursor-pointer appearance-none rounded-lg bg-stroke outline-none dark:bg-form-strokedark [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"flex items-center gap-3\">\n        <input\n          type=\"range\"\n          {...register(\"").concat(fieldName, "\")}\n          defaultValue=\"").concat(defaultValue || attr.min || 0, "\"\n          min=\"").concat(attr.min || 0, "\"\n          max=\"").concat(attr.max || 100, "\"\n          step=\"").concat(attr.step || 1, "\"\n          className=\"").concat(className, "\"\n          ").concat(isDisabled ? 'disabled' : '', "\n        />\n        <span className=\"min-w-[45px] rounded-md border border-stroke px-2 py-1 text-sm font-medium text-black dark:border-form-strokedark dark:text-white\">\n          {watch(\"").concat(fieldName, "\")}\n        </span>\n      </div>\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
