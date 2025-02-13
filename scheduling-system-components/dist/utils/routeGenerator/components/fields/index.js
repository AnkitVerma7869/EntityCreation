"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileField = exports.generateRichTextField = exports.generateSelectField = exports.generateDateField = void 0;
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
function generateSingleField(attr, fieldName) {
    switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
        case 'date':
            return (0, DateField_1.generateDateField)(attr, fieldName);
        case 'select':
        case 'multiselect':
            return (0, SelectField_1.generateSelectField)(attr, fieldName);
        case 'rich-text':
            return (0, RichTextField_1.generateRichTextField)(attr, fieldName);
        case 'file':
            return (0, FileField_1.generateFileField)(attr, fieldName);
        default:
            return (0, TextField_1.generateTextField)(attr, fieldName);
    }
}
function generateField(entity) {
    var fields = entity.attributes.map(function (attr) {
        var fieldName = attr.name.replace(/\s+/g, '_');
        return generateSingleField(attr, fieldName);
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
