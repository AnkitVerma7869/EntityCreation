"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileField = generateFileField;
function generateFileField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d, _e;
    var isDisabled = ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.disabled) || false;
    var className = "w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent text-center file:mr-4 file:px-4 file:mt-0 file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 dark:file:bg-boxdark dark:file:text-white dark:text-white dark:hover:file:bg-boxdark-2 ".concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.className) || '');
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div className=\"relative\">\n        <input\n          type=\"file\"\n          {...register(\"").concat(fieldName, "\")}\n          defaultValue=\"").concat(defaultValue || '', "\"\n          className=\"").concat(className, "\"\n          accept=\"").concat(((_d = attr.config) === null || _d === void 0 ? void 0 : _d.acceptedFileTypes) || '*', "\"\n          ").concat(((_e = attr.config) === null || _e === void 0 ? void 0 : _e.multiple) ? 'multiple' : '', "\n          ").concat(isDisabled ? 'disabled' : '', "\n        />\n      </div>\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
