"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telFieldImports = void 0;
exports.generateTelField = generateTelField;
function generateTelField(attr, fieldName) {
    var _a, _b;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <PhoneNumberInput\n        name=\"").concat(fieldName, "\"\n        control={control}\n        onValueChange={(value) => {\n          // Update the form value with phone and country code\n          setValue('").concat(fieldName, "', value.phone);\n          setValue('countryCode_").concat(fieldName, "', value.countryCode);\n        }}\n        disabled={").concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.disabled) || false, "}\n      />\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n    </div>\n  ");
}
// Add this to the imports section of the form page
exports.telFieldImports = "\nimport PhoneNumberInput from '@/components/PhoneNumberInput';\n";
