"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.telFieldImports = void 0;
exports.generateTelField = generateTelField;
function generateTelField(attr, fieldName) {
    var _a, _b;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <PhoneNumberInput\n        name=\"").concat(fieldName, "\"\n        control={control}\n        onValueChange={(value) => {\n          // Extract only the numbers from the phone string\n          const phoneDigits = value.phone.replace(/D/g, '');\n          const countryCodeDigits = value.countryCode.replace(/D/g, '');\n          \n          // Remove country code if it exists at the start of the phone number\n          let finalPhone = phoneDigits;\n          if (phoneDigits.startsWith(countryCodeDigits)) {\n            finalPhone = phoneDigits.slice(countryCodeDigits.length);\n          }\n          \n          setValue('").concat(fieldName, "', finalPhone);\n          setValue('countryCode_").concat(fieldName, "', countryCodeDigits);\n        }}\n        disabled={").concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.disabled) || false, "}\n      />\n      {errors.").concat(fieldName, " && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors.").concat(fieldName, "?.message}</p>\n      )}\n      {errors['countryCode_").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['countryCode_").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
// Add this to the imports section of the form page
exports.telFieldImports = "\nimport PhoneNumberInput from '@/components/PhoneNumberInput';\n";
