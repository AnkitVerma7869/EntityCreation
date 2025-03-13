"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateValidationSchema = generateValidationSchema;
function generateValidationSchema(attributes) {
    var schemaFields = attributes.map(function (attr) {
        var _a, _b, _c;
        var fieldName = attr.name.replace(/\s+/g, '_');
        function formatFieldName(name) {
            // If name contains hyphen, wrap it in quotes
            return name.includes('-') ? "'".concat(name, "'") : name;
        }
        var formattedFieldName = formatFieldName(fieldName);
        var yupType = getYupType(attr);
        // Start with the type declaration
        var schema = "".concat(formattedFieldName, ": yup.").concat(yupType, "()");
        // Special handling for telephone fields
        if (attr.inputType.toLowerCase() === 'tel') {
            schema = "".concat(formattedFieldName, ": yup.string()");
            return schema;
        }
        // For checkbox with options, add validation for array of strings
        if (attr.inputType.toLowerCase() === 'checkbox' && Array.isArray(attr.options) && attr.options.length > 0) {
            schema = "".concat(formattedFieldName, ": yup.array().of(yup.string())");
            if ((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) {
                schema += '.min(1, "Please select at least one option")';
            }
            if (((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.min) !== undefined) {
                schema += ".min(".concat(attr.validations.min, ", \"Please select at least ").concat(attr.validations.min, " options\")");
            }
            if (((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.max) !== undefined) {
                schema += ".max(".concat(attr.validations.max, ", \"Please select at most ").concat(attr.validations.max, " options\")");
            }
            return schema;
        }
        // Add typeError based on the field type
        if (yupType === 'number') {
            schema += ".typeError(\"".concat(attr.name, " must be a number\")");
        }
        else if (yupType === 'date') {
            schema += ".typeError(\"".concat(attr.name, " must be a valid date\")");
        }
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
            // Handle string-specific validations
            if (yupType === 'string') {
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
            if (yupType === 'number') {
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
            if (yupType === 'boolean') {
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
                var type = yupType;
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
    return schemaFields;
}
function getYupType(attr) {
    var _a, _b;
    var inputType = attr.inputType.toLowerCase();
    var dataType = attr.dataType.toLowerCase();
    // Handle checkbox as array when it has options
    if (inputType === 'checkbox' && Array.isArray(attr.options) && attr.options.length > 0) {
        return 'array';
    }
    // Single checkbox without options is boolean
    if (inputType === 'checkbox') {
        return 'boolean';
    }
    // Always treat number input type as number regardless of dataType
    if (inputType === 'number')
        return 'number';
    // Handle other special input types
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
    // Handle select input type
    if (inputType === 'select') {
        return ((_b = attr.config) === null || _b === void 0 ? void 0 : _b.multiple) ? 'array' : 'string';
    }
    // Default to string for all other types
    return 'string';
}
