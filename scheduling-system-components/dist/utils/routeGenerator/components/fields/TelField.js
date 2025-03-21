"use strict";
/**
 * Telephone Field Generator
 * Generates HTML/JSX for telephone input form fields with phone number formatting
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.telFieldImports = void 0;
exports.generateTelField = generateTelField;
/**
 * Generates a telephone input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default phone number
 * @returns {string} Generated telephone field JSX
 */
function generateTelField(attr, fieldName, defaultValue) {
    var _a, _b;
    return "\n    <div>\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <PhoneNumberInput\n        name=\"").concat(fieldName, "\"\n        control={control}\n        onValueChange={(value) => {\n          // Simple concatenation with + prefix\n          const phoneWithCode = `+${value.countryCode}${value.phone}`;\n          setValue('").concat(fieldName, "', phoneWithCode);\n        }}\n        disabled={").concat(((_b = attr.config) === null || _b === void 0 ? void 0 : _b.disabled) || false, "}\n      />\n      {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
// Add this to the imports section of the form page
exports.telFieldImports = "\nimport PhoneNumberInput from '@/components/PhoneNumberInput';\n";
