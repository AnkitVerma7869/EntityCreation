"use strict";
/**
 * Helper Functions Module
 * Contains utility functions used across the application
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPrimaryKey = exports.isPrimaryKeyExists = exports.getNumericTypeCategory = exports.needsPrecision = exports.needsSizeValidation = void 0;
var dataTypeProperties_1 = require("../constants/dataTypeProperties");
/**
 * Checks if a given SQL data type requires size validation
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs size validation
 */
var needsSizeValidation = function (dataType) {
    var _a, _b;
    var type = dataType.toLowerCase();
    return (_b = (_a = dataTypeProperties_1.dataTypeProperties[type]) === null || _a === void 0 ? void 0 : _a.needsSize) !== null && _b !== void 0 ? _b : false;
};
exports.needsSizeValidation = needsSizeValidation;
/**
 * Checks if a given SQL data type requires precision specification
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs precision
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
 * Checks if a primary key exists in the attribute list
 * @param {Attribute[]} attributes - List of attributes to check
 * @param {number | null} editingIndex - Index of attribute being edited (to exclude from check)
 * @returns {boolean} Whether a primary key exists
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
