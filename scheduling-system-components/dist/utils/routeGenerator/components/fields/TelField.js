"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTelField = generateTelField;
function generateTelField(attr, fieldName) {
    var _a, _b, _c;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <input\n        type=\"tel\"\n        {...register(\"").concat(fieldName, "\")}\n        placeholder=\"").concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.placeholder) || "Enter ".concat(attr.name.toLowerCase()), "\"\n        pattern=\"").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.pattern) || '[0-9]{10}', "\"\n        className=\"w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary\"\n      />\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
