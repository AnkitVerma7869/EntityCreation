"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRadioField = generateRadioField;
function generateRadioField(attr, fieldName) {
    var _a;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"flex gap-2\">\n        ").concat((attr.options || []).map(function (option) { return "\n          <label className=\"flex items-center text-sm font-medium text-black dark:text-white\">\n            <input\n              type=\"radio\"\n              {...register(\"".concat(fieldName, "\")}\n              value=\"").concat(option.value, "\"   \n              className=\"mr-3 h-5 w-5 cursor-pointer border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input\"\n            />\n            ").concat(option.label, "\n          </label>\n        "); }).join(''), "\n      </div>\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
