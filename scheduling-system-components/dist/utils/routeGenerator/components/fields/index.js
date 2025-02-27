"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTextAreaField = exports.generateTimeField = exports.generateHiddenField = exports.generateSearchField = exports.generateRangeField = exports.generateColorField = exports.generateUrlField = exports.generateTelField = exports.generateRadioField = exports.generateCheckboxField = exports.generateDateTimeField = exports.generatePasswordField = exports.generateEmailField = exports.generateFileField = exports.generateRichTextField = exports.generateSelectField = exports.generateDateField = void 0;
exports.generateField = generateField;
var DateField_1 = require("./DateField");
Object.defineProperty(exports, "generateDateField", { enumerable: true, get: function () { return DateField_1.generateDateField; } });
var SelectField_1 = require("./SelectField");
Object.defineProperty(exports, "generateSelectField", { enumerable: true, get: function () { return SelectField_1.generateSelectField; } });
var RichTextField_1 = require("./RichTextField");
Object.defineProperty(exports, "generateRichTextField", { enumerable: true, get: function () { return RichTextField_1.generateRichTextField; } });
var FileField_1 = require("./FileField");
Object.defineProperty(exports, "generateFileField", { enumerable: true, get: function () { return FileField_1.generateFileField; } });
var TextField_1 = require("./TextField");
var EmailField_1 = require("./EmailField");
Object.defineProperty(exports, "generateEmailField", { enumerable: true, get: function () { return EmailField_1.generateEmailField; } });
var PasswordField_1 = require("./PasswordField");
Object.defineProperty(exports, "generatePasswordField", { enumerable: true, get: function () { return PasswordField_1.generatePasswordField; } });
var DateTimeField_1 = require("./DateTimeField");
Object.defineProperty(exports, "generateDateTimeField", { enumerable: true, get: function () { return DateTimeField_1.generateDateTimeField; } });
var CheckboxField_1 = require("./CheckboxField");
Object.defineProperty(exports, "generateCheckboxField", { enumerable: true, get: function () { return CheckboxField_1.generateCheckboxField; } });
var RadioField_1 = require("./RadioField");
Object.defineProperty(exports, "generateRadioField", { enumerable: true, get: function () { return RadioField_1.generateRadioField; } });
var TelField_1 = require("./TelField");
Object.defineProperty(exports, "generateTelField", { enumerable: true, get: function () { return TelField_1.generateTelField; } });
var UrlField_1 = require("./UrlField");
Object.defineProperty(exports, "generateUrlField", { enumerable: true, get: function () { return UrlField_1.generateUrlField; } });
var ColorField_1 = require("./ColorField");
Object.defineProperty(exports, "generateColorField", { enumerable: true, get: function () { return ColorField_1.generateColorField; } });
var RangeField_1 = require("./RangeField");
Object.defineProperty(exports, "generateRangeField", { enumerable: true, get: function () { return RangeField_1.generateRangeField; } });
var SearchField_1 = require("./SearchField");
Object.defineProperty(exports, "generateSearchField", { enumerable: true, get: function () { return SearchField_1.generateSearchField; } });
var HiddenField_1 = require("./HiddenField");
Object.defineProperty(exports, "generateHiddenField", { enumerable: true, get: function () { return HiddenField_1.generateHiddenField; } });
var TimeField_1 = require("./TimeField");
Object.defineProperty(exports, "generateTimeField", { enumerable: true, get: function () { return TimeField_1.generateTimeField; } });
var TextAreaField_1 = require("./TextAreaField");
Object.defineProperty(exports, "generateTextAreaField", { enumerable: true, get: function () { return TextAreaField_1.generateTextAreaField; } });
// Helper function to format field labels for display
function formatFieldLabel(name) {
    return name
        .split(/[_\s-]+/) // Split by underscore, space, and hyphen
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); })
        .join(' ');
}
// Helper function to format field names for form handling
function formatFieldName(name) {
    // Keep original name but ensure it's a valid identifier
    // This preserves hyphenated names for proper form handling
    return name
        .trim()
        .replace(/\s+/g, '-'); // Replace spaces with hyphens
}
function generateSingleField(attr, fieldName, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    // Format the label for display (e.g., "First Name")
    var fieldLabel = formatFieldLabel(attr.name);
    // Keep original field name structure but ensure it's valid
    var formattedFieldName = formatFieldName(fieldName);
    // Create a new attribute with formatted names
    var formattedAttr = __assign(__assign({}, attr), { name: fieldLabel // Use formatted label for display
     });
    // Handle defaultValue
    var defaultVal = defaultValue || attr.defaultValue || '';
    // Check for predefined enum types first
    if (attr.inputType.endsWith('_enum')) {
        // All predefined enums use radio or select based on their config
        switch (attr.inputType) {
            case 'gender_enum':
            case 'customer_type_enum':
                return (0, RadioField_1.generateRadioField)(formattedAttr, formattedFieldName, defaultVal);
            case 'languages_enum':
            case 'order_status_enum':
            case 'programming_language_enum':
            case 'status_enum':
                return (0, SelectField_1.generateSelectField)(formattedAttr, formattedFieldName, defaultVal);
            default:
                // For any new enum types, default to select
                return (0, SelectField_1.generateSelectField)(formattedAttr, formattedFieldName, defaultVal);
        }
    }
    switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
        case 'date':
            return (0, DateField_1.generateDateField)(formattedAttr, formattedFieldName, defaultVal);
        case 'datetime-local':
            return (0, DateTimeField_1.generateDateTimeField)(formattedAttr, formattedFieldName, defaultVal);
        case 'select':
        case 'multiselect':
            return (0, SelectField_1.generateSelectField)(formattedAttr, formattedFieldName, defaultVal);
        case 'rich-text':
            return (0, RichTextField_1.generateRichTextField)(formattedAttr, formattedFieldName, defaultVal);
        case 'file':
            return (0, FileField_1.generateFileField)(formattedAttr, formattedFieldName, defaultVal);
        case 'email':
            return (0, EmailField_1.generateEmailField)(formattedAttr, formattedFieldName, defaultVal);
        case 'password':
            return (0, PasswordField_1.generatePasswordField)(formattedAttr, formattedFieldName, defaultVal);
        case 'checkbox':
            return (0, CheckboxField_1.generateCheckboxField)(formattedAttr, formattedFieldName, defaultVal);
        case 'radio':
            return (0, RadioField_1.generateRadioField)(formattedAttr, formattedFieldName, defaultVal);
        case 'tel':
            return (0, TelField_1.generateTelField)(formattedAttr, formattedFieldName, defaultVal);
        case 'url':
            return (0, UrlField_1.generateUrlField)(formattedAttr, formattedFieldName, defaultVal);
        case 'color':
            return (0, ColorField_1.generateColorField)(formattedAttr, formattedFieldName, defaultVal);
        case 'range':
            return (0, RangeField_1.generateRangeField)(formattedAttr, formattedFieldName, defaultVal);
        case 'search':
            return (0, SearchField_1.generateSearchField)(formattedAttr, formattedFieldName, defaultVal);
        case 'hidden':
            return (0, HiddenField_1.generateHiddenField)(formattedAttr, formattedFieldName, defaultVal);
        case 'time':
            return (0, TimeField_1.generateTimeField)(formattedAttr, formattedFieldName, defaultVal);
        case 'textarea':
            return (0, TextAreaField_1.generateTextAreaField)(formattedAttr, formattedFieldName, defaultVal);
        case 'gender':
            return (0, RadioField_1.generateRadioField)(formattedAttr, formattedFieldName, defaultVal);
        default:
            return (0, TextField_1.generateTextField)(formattedAttr, formattedFieldName);
    }
}
function generateField(entity) {
    var fields = entity.attributes.map(function (attr) {
        return generateSingleField(attr, attr.name, attr.defaultValue || null);
    });
    // Group fields into pairs for two-column layout
    var pairedFields = [];
    for (var i = 0; i < fields.length; i += 2) {
        var pair = [fields[i]];
        if (i + 1 < fields.length) {
            pair.push(fields[i + 1]);
        }
        pairedFields.push(pair);
    }
    // Generate the grid layout
    return pairedFields.map(function (pair) { return "\n    <div className=\"mb-3 flex flex-col gap-6 xl:flex-row\">\n      <div className=\"w-full xl:w-1/2\">\n        ".concat(pair[0], "\n      </div>\n      ").concat(pair[1] ? "\n      <div className=\"w-full xl:w-1/2\">\n        ".concat(pair[1], "\n      </div>\n      ") : '', "\n    </div>\n  "); }).join('\n');
}
