"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDateTimeField = generateDateTimeField;
function generateDateTimeField(attr, fieldName, defaultValue) {
    var _a, _b, _c;
    // Format current datetime to YYYY-MM-DDTHH:mm format
    var getCurrentDateTime = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = String(now.getMonth() + 1).padStart(2, '0');
        var day = String(now.getDate()).padStart(2, '0');
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes);
    };
    // Use provided default value or current datetime
    var defaultDateTime = getCurrentDateTime();
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <div \n        className=\"relative cursor-pointer\"\n        onClick={() => {\n          const input = document.querySelector('#").concat(fieldName, "') as HTMLInputElement;\n          if (input) input.showPicker();\n        }}\n      >\n        <input\n          id=\"").concat(fieldName, "\"\n          type=\"datetime-local\"\n          {...register(\"").concat(fieldName, "\")}\n          defaultValue=\"").concat(defaultDateTime, "\"\n          className=\"w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary cursor-pointer\"\n          ").concat(((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.min) ? "min=\"".concat(attr.validations.min, "\"") : '', "\n          ").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.max) ? "max=\"".concat(attr.validations.max, "\"") : '', "\n          onChange={(e) => {\n            if (e.target.value) {\n              e.target.blur();\n            }\n          }}\n        />\n      </div>\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
