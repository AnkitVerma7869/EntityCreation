"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSelectField = generateSelectField;
function generateSelectField(attr, fieldName) {
    var _a, _b;
    var isMultiple = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) || false;
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <select\n        {...register(\"").concat(fieldName, "\")}\n        className=\"w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary\"\n        multiple={").concat(isMultiple, "}\n      >\n        <option value=\"\">Select ").concat(attr.name, "</option>\n        ").concat((attr.options || []).map(function (opt) { return "\n          <option value=\"".concat(opt.value, "\">").concat(opt.label, "</option>\n        "); }).join(''), "\n      </select>\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
