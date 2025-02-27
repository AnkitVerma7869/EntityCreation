"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRichTextField = generateRichTextField;
function generateRichTextField(attr, fieldName, defaultValue) {
    var _a, _b;
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <textarea\n        {...register(\"").concat(fieldName, "\")}\n        defaultValue=\"").concat(defaultValue || '', "\"\n        className=\"w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary\"\n        rows=\"6\"\n        placeholder=\"").concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.placeholder) || "Type your ".concat(attr.name.toLowerCase()), "\"\n      ></textarea>\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
