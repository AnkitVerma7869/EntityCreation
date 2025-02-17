"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCheckboxField = generateCheckboxField;
function generateCheckboxField(attr, fieldName) {
    var _a;
    return "\n    <div>\n      <label className=\"mb-1 flex items-center text-sm font-medium text-black dark:text-white\">\n        <input\n          type=\"checkbox\"\n          {...register(\"".concat(fieldName, "\")}\n          className=\"mr-3 h-5 w-5 cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input\"\n        />\n        ").concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
