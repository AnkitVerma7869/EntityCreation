"use strict";
/**
 * Select Field Generator
 * Generates HTML/JSX for select/dropdown form fields using react-select
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFieldImports = void 0;
exports.generateSelectField = generateSelectField;
/**
 * Generates a select/dropdown field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default selected value(s)
 * @returns {string} Generated select field JSX
 */
function generateSelectField(attr, fieldName, defaultValue) {
    var _a;
    var isDisabled = attr.isReadOnly || !attr.isEditable;
    // Handle options based on their type
    var optionsArray = attr.options || [];
    var optionsString = optionsArray
        .map(function (opt) {
        var option = typeof opt === 'object' ? opt : { value: opt, label: opt };
        return "{ value: \"".concat(option.value, "\", label: \"").concat(option.label || option.value, "\" }");
    })
        .join(',\n              ');
    return "\n    <div className=\"mb-4.5 w-full\">\n      <label className=\"mb-1 block text-sm font-medium text-black dark:text-white\">\n        ".concat(attr.name, " ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? '<span className="text-meta-1">*</span>' : '', "\n      </label>\n      <Controller\n        name=\"").concat(fieldName, "\"\n        control={control}\n        defaultValue={undefined}\n        render={({ field: { onChange, value, ...field } }) => (\n          <Select\n            {...field}\n            value={value ? { value, label: value } : null}\n            onChange={(option) => onChange(option?.value)}\n            isMulti={").concat(attr.isMultiSelect || false, "}\n            isDisabled={").concat(isDisabled, "}\n            options={[\n              ").concat(optionsString, "\n            ]}\n            className={`react-select ${").concat(isDisabled, " ? 'cursor-not-allowed opacity-70' : ''}`}\n            classNamePrefix=\"select\"\n            placeholder=\"Select ").concat(attr.name, "\"\n            isClearable\n          />\n        )}\n      />\n       {errors['").concat(fieldName, "'] && (\n        <p className=\"mt-1 text-sm text-meta-1\">{errors['").concat(fieldName, "']?.message}</p>\n      )}\n    </div>\n  ");
}
exports.selectFieldImports = "\nimport Select from 'react-select';\n";
