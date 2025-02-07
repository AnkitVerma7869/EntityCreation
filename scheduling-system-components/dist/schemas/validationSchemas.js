"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.precisionSchema = exports.sizeSchema = exports.dataTypeSchema = exports.attributeNameSchema = exports.entityNameSchema = void 0;
var yup = __importStar(require("yup"));
var dataTypeProperties_1 = require("../constants/dataTypeProperties");
var helpers_1 = require("../helpers/helpers");
// Validation schema for entity name
exports.entityNameSchema = yup.string()
    .required("Entity name is required")
    .test('no-spaces', 'Spaces are not allowed in entity name', function (value) {
    return value ? !value.includes(' ') : true;
})
    .matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Entity name must start with a letter or underscore and can only contain letters, numbers, and underscores")
    .min(2, "Entity name must be at least 2 characters")
    .max(50, "Entity name must not exceed 50 characters")
    .trim();
// Validation schema for attribute name
exports.attributeNameSchema = yup.string()
    .required("Attribute name is required")
    .test('no-spaces', 'Spaces are not allowed in attribute name', function (value) {
    return value ? !value.includes(' ') : true;
})
    .matches(/^[a-zA-Z_][a-zA-Z0-9_]*$/, "Attribute name must start with a letter or underscore and can only contain letters, numbers, and underscores")
    .min(2, "Attribute name must be at least 2 characters")
    .max(50, "Attribute name must not exceed 50 characters")
    .trim();
// New schemas
exports.dataTypeSchema = yup.string()
    .required("Data type is required")
    .test('valid-data-type', 'Invalid data type', function (value) {
    return Boolean(value && value.toLowerCase() in dataTypeProperties_1.dataTypeProperties);
});
exports.sizeSchema = yup.number()
    .nullable()
    .test('size-validation', 'Invalid size', function (value) {
    var dataType = this.parent.dataType;
    var type = dataType.toLowerCase();
    if (!dataType || !(0, helpers_1.needsSizeValidation)(dataType))
        return true;
    // Check if size is required but missing
    if (value === null || value === undefined) {
        return this.createError({
            message: "Size is required for ".concat(dataType)
        });
    }
    // Check minimum value
    if (value <= 0) {
        return this.createError({
            message: 'Size must be greater than 0'
        });
    }
    // Check maximum size limits for char and varchar
    if (type === 'char' && value > dataTypeProperties_1.maxSizes.char) {
        return this.createError({
            message: "Maximum size for CHAR is ".concat(dataTypeProperties_1.maxSizes.char)
        });
    }
    if (type === 'varchar' && value > dataTypeProperties_1.maxSizes.varchar) {
        return this.createError({
            message: "Maximum size for VARCHAR is ".concat(dataTypeProperties_1.maxSizes.varchar)
        });
    }
    return true;
});
exports.precisionSchema = yup.number()
    .nullable()
    .test('precision-validation', 'Invalid precision', function (value) {
    var dataType = this.parent.dataType;
    if (!dataType || !(0, helpers_1.needsPrecision)(dataType))
        return true;
    if (value === null || value === undefined) {
        return this.createError({
            message: "Precision is required for ".concat(dataType)
        });
    }
    var limits = dataTypeProperties_1.precisionLimits[dataType.toLowerCase()];
    if (limits && (value < limits.min || value > limits.max)) {
        return this.createError({
            message: "Precision for ".concat(dataType, " must be between ").concat(limits.min, " and ").concat(limits.max)
        });
    }
    return true;
});
