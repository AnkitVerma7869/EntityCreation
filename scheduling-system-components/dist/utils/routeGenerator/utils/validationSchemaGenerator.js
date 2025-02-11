"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidationSchema = generateValidationSchema;
function generateValidationSchema(attributes) {
    return attributes.map(function (attr) {
        var fieldName = attr.name.replace(/\s+/g, '_');
        var schema = "".concat(fieldName, ": yup.").concat(getYupType(attr), "()");
        if (attr.validations) {
            var _a = attr.validations, required = _a.required, min = _a.min, max = _a.max, pattern = _a.pattern, minLength = _a.minLength, maxLength = _a.maxLength;
            if (required) {
                schema += '.required("This field is required")';
            }
            switch (attr.dataType.toLowerCase()) {
                case 'number':
                    if (min !== undefined)
                        schema += ".min(".concat(min, ", \"Minimum value is ").concat(min, "\")");
                    if (max !== undefined)
                        schema += ".max(".concat(max, ", \"Maximum value is ").concat(max, "\")");
                    break;
                case 'string':
                    if (minLength !== undefined)
                        schema += ".min(".concat(minLength, ", \"Minimum length is ").concat(minLength, "\")");
                    if (maxLength !== undefined)
                        schema += ".max(".concat(maxLength, ", \"Maximum length is ").concat(maxLength, "\")");
                    if (pattern)
                        schema += ".matches(/".concat(pattern, "/, \"Invalid format\")");
                    break;
                case 'date':
                    if (min)
                        schema += ".min(new Date(\"".concat(min, "\"), \"Date must be after ").concat(min, "\")");
                    if (max)
                        schema += ".max(new Date(\"".concat(max, "\"), \"Date must be before ").concat(max, "\")");
                    break;
            }
        }
        return schema;
    }).join(',\n');
}
function getYupType(attr) {
    switch (attr.dataType.toLowerCase()) {
        case 'number':
        case 'integer':
        case 'decimal':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'date':
            return 'date';
        default:
            return 'string';
    }
}
