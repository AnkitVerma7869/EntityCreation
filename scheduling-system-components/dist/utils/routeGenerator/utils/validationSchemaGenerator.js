"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidationSchema = generateValidationSchema;
function generateValidationSchema(attributes) {
    return attributes.map(function (attr) {
        var fieldName = attr.name.replace(/\s+/g, '_');
        // Start with the type declaration first
        var schema = "".concat(fieldName, ": yup.").concat(getYupType(attr), "()");
        if (attr.validations) {
            // Debug log for validations
            console.log('Validations for', attr.name, ':', attr.validations);
            // Add required validation if needed
            if (attr.validations.required) {
                schema += '.required("This field is required")';
            }
            // Handle nullable validation
            if (attr.validations.nullable) {
                schema += '.nullable()';
            }
            // Handle type transformations for numbers
            if (getYupType(attr) === 'number') {
                schema += '.transform((value) => (isNaN(value) || value === "" ? undefined : Number(value)))';
            }
            // Handle type transformations for dates
            if (getYupType(attr) === 'date') {
                schema += ".transform((value) => {\n          if (!value || value === \"\") return null;\n          const date = new Date(value);\n          return isNaN(date.getTime()) ? null : date;\n        })";
            }
            // Handle string-specific validations
            if (getYupType(attr) === 'string') {
                if (attr.validations.trim)
                    schema += '.trim()';
                if (attr.validations.lowercase)
                    schema += '.lowercase()';
                if (attr.validations.uppercase)
                    schema += '.uppercase()';
                if (attr.validations.matches)
                    schema += ".matches(/".concat(attr.validations.matches, "/, \"Invalid format\")");
                if (attr.validations.uuid)
                    schema += '.uuid("Invalid UUID format")';
                if (attr.validations.url)
                    schema += '.url("Invalid URL format")';
                if (attr.validations.email || attr.inputType.toLowerCase() === 'email') {
                    schema += '.email("Invalid email format")';
                }
            }
            // Handle number-specific validations
            if (getYupType(attr) === 'number') {
                if (attr.validations.integer)
                    schema += '.integer("Must be an integer")';
                if (attr.validations.positive)
                    schema += '.positive("Must be a positive number")';
                if (attr.validations.negative)
                    schema += '.negative("Must be a negative number")';
                if (attr.validations.lessThan !== undefined) {
                    schema += ".lessThan(".concat(attr.validations.lessThan, ", \"Must be less than ").concat(attr.validations.lessThan, "\")");
                }
                if (attr.validations.moreThan !== undefined) {
                    schema += ".moreThan(".concat(attr.validations.moreThan, ", \"Must be more than ").concat(attr.validations.moreThan, "\")");
                }
            }
            // Handle boolean-specific validations
            if (getYupType(attr) === 'boolean') {
                if (attr.validations.isTrue)
                    schema += '.isTrue("Must be true")';
                if (attr.validations.isFalse)
                    schema += '.isFalse("Must be false")';
            }
            // Handle array-specific validations
            if (attr.validations.isArray) {
                schema += '.array()';
                if (attr.validations.length !== undefined) {
                    schema += ".length(".concat(attr.validations.length, ", \"Must have exactly ").concat(attr.validations.length, " items\")");
                }
            }
            // Handle oneOf and notOneOf validations
            if (attr.validations.oneOf) {
                var values = Array.isArray(attr.validations.oneOf) ? attr.validations.oneOf : [attr.validations.oneOf];
                schema += ".oneOf([".concat(values.map(function (v) { return JSON.stringify(v); }).join(', '), "], \"Must be one of the allowed values\")");
            }
            if (attr.validations.notOneOf) {
                var values = Array.isArray(attr.validations.notOneOf) ? attr.validations.notOneOf : [attr.validations.notOneOf];
                schema += ".notOneOf([".concat(values.map(function (v) { return JSON.stringify(v); }).join(', '), "], \"Must not be one of these values\")");
            }
            // Handle min/max validations based on type
            if (attr.validations.min !== undefined || attr.validations.max !== undefined) {
                var type = getYupType(attr);
                if (type === 'string') {
                    if (attr.validations.min !== undefined) {
                        schema += ".min(".concat(attr.validations.min, ", \"Must be at least ").concat(attr.validations.min, " characters\")");
                    }
                    if (attr.validations.max !== undefined) {
                        schema += ".max(".concat(attr.validations.max, ", \"Must be at most ").concat(attr.validations.max, " characters\")");
                    }
                }
                else if (type === 'number') {
                    if (attr.validations.min !== undefined) {
                        schema += ".min(".concat(attr.validations.min, ", \"Must be at least ").concat(attr.validations.min, "\")");
                    }
                    if (attr.validations.max !== undefined) {
                        schema += ".max(".concat(attr.validations.max, ", \"Must be at most ").concat(attr.validations.max, "\")");
                    }
                }
                else if (type === 'date') {
                    if (attr.validations.min) {
                        schema += ".min(new Date(\"".concat(attr.validations.min, "\"), \"Date must be after ").concat(attr.validations.min, "\")");
                    }
                    if (attr.validations.max) {
                        schema += ".max(new Date(\"".concat(attr.validations.max, "\"), \"Date must be before ").concat(attr.validations.max, "\")");
                    }
                }
            }
            // Handle constraints
            if (attr.constraints) {
                if (attr.constraints.includes('unique')) {
                    // Note: Unique constraint typically handled at database level
                    schema += ".test('unique', '".concat(attr.name, " must be unique', async (value) => {\n            if (!value) return true;\n            // Implement unique check logic here\n            return true;\n          })");
                }
            }
        }
        console.log('Generated schema for', attr.name, ':', schema);
        return schema;
    }).join(',\n');
}
function getYupType(attr) {
    var _a;
    var inputType = attr.inputType.toLowerCase();
    var dataType = attr.dataType.toLowerCase();
    // Always treat number input type as number regardless of dataType
    if (inputType === 'number')
        return 'number';
    // Handle other special input types
    if (inputType === 'checkbox')
        return 'boolean';
    if (inputType === 'datetime-local' || inputType === 'date')
        return 'date';
    // Then handle data types
    if (['number', 'integer', 'decimal', 'numeric', 'float', 'double', 'real', 'smallint', 'bigint'].includes(dataType)) {
        return 'number';
    }
    if (['date', 'timestamp', 'datetime'].includes(dataType)) {
        return 'date';
    }
    if (dataType === 'boolean') {
        return 'boolean';
    }
    if (dataType === 'array' || ((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.isArray)) {
        return 'array';
    }
    // Default to string for all other types
    return 'string';
}
