"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateColorField = generateColorField;
function generateColorField(attr, fieldName, defaultValue) {
    var _a;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <input\n        type=\"color\"\n        {...register(\"").concat(fieldName, "\")}\n        defaultValue=\"").concat(defaultValue || '#000000', "\"\n        className=\"h-10 w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary\"\n      />\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
