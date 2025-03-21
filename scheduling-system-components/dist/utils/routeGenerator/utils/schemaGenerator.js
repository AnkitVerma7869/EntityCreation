"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSchemaFile = generateSchemaFile;
var entityValidationSchema_1 = require("../schemas/entityValidationSchema");
function generateSchemaFile(config) {
    return "\n    import * as yup from 'yup';    \n    export const validationSchema = ".concat((0, entityValidationSchema_1.getFormValidationSchema)(config).toString(), ";\n  ");
}
