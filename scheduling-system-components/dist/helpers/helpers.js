"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPrimaryKey = exports.isPrimaryKeyExists = exports.getNumericTypeCategory = exports.needsPrecision = exports.needsSizeValidation = void 0;
var dataTypeProperties_1 = require("../constants/dataTypeProperties");
/**
 * Checks if a given SQL data type requires size validation
 * @param dataType - The SQL data type to check (e.g., varchar, char)
 * @returns boolean indicating whether the type needs size validation
 */
var needsSizeValidation = function (dataType) {
    var _a, _b;
    var type = dataType.toLowerCase();
    return (_b = (_a = dataTypeProperties_1.dataTypeProperties[type]) === null || _a === void 0 ? void 0 : _a.needsSize) !== null && _b !== void 0 ? _b : false;
};
exports.needsSizeValidation = needsSizeValidation;
/**
 * Checks if a given SQL data type requires precision specification
 * @param dataType - The SQL data type to check (e.g., decimal, numeric)
 * @returns boolean indicating whether the type needs precision
 */
var needsPrecision = function (dataType) {
    var _a, _b;
    var type = dataType.toLowerCase();
    return (_b = (_a = dataTypeProperties_1.dataTypeProperties[type]) === null || _a === void 0 ? void 0 : _a.needsPrecision) !== null && _b !== void 0 ? _b : false;
};
exports.needsPrecision = needsPrecision;
/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
var getNumericTypeCategory = function (dataType) {
    var type = dataType.toLowerCase();
    if (['smallint', 'integer', 'bigint'].includes(type)) {
        return 'integer';
    }
    if (['decimal', 'numeric'].includes(type)) {
        return 'decimal';
    }
    if (['real', 'double precision'].includes(type)) {
        return 'floating';
    }
    return null;
};
exports.getNumericTypeCategory = getNumericTypeCategory;
/**
 * Checks if a primary key already exists in the attributes list, excluding the currently editing attribute
 * @param attributes - List of table attributes
 * @param editingIndex - Index of the attribute currently being edited (if any)
 * @returns boolean indicating whether a primary key exists in other attributes
 */
var isPrimaryKeyExists = function (attributes, editingIndex) {
    return attributes.some(function (attr, idx) {
        if (editingIndex !== null && idx === editingIndex)
            return false;
        return attr.constraints.includes('primary key');
    });
};
exports.isPrimaryKeyExists = isPrimaryKeyExists;
/**
 * Checks if any attribute in the list has a PRIMARY KEY constraint
 * @param attrs - List of table attributes to check
 * @returns boolean indicating whether a primary key exists
 */
var hasPrimaryKey = function (attrs) {
    return attrs.some(function (attr) {
        return Array.isArray(attr.constraints) &&
            attr.constraints.includes('PRIMARY KEY');
    });
};
exports.hasPrimaryKey = hasPrimaryKey;
