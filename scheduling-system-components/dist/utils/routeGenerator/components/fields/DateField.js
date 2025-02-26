"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDateField = generateDateField;
function generateDateField(attr, fieldName, defaultValue) {
    var _a, _b, _c, _d;
    // Use current date if no default value is provided
    var defaultDate = defaultValue || new Date().toISOString().split('T')[0];
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <DatePickerOneRequired\n        defaultValue={new Date(\"").concat(defaultDate, "\")}\n        onChange={(selectedDates) => setValue(\"").concat(fieldName, "\", selectedDates[0])}\n        required={").concat(((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.required) ? 'true' : 'false', "}\n        minDate={").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.min) ? "new Date(\"".concat(attr.validations.min, "\")") : 'undefined', "}\n        maxDate={").concat(((_d = attr.validations) === null || _d === void 0 ? void 0 : _d.max) ? "new Date(\"".concat(attr.validations.max, "\")") : 'undefined', "}\n        labelClasses=\"hidden\"\n      />\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
