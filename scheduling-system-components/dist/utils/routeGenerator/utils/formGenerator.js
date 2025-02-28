"use strict";
/**
 * Form Generator Module
 * Generates React form components based on entity attributes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFormFields = generateFormFields;
/**
 * Generates a form field component based on attribute type
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} Generated JSX for the field component
 */
function generateFieldComponent(attr) {
    var _a;
    var fieldName = attr.name.replace(/\s+/g, '_');
    switch (attr.dataType.toLowerCase()) {
        case 'date':
            return "\n        <DatePicker\n          label=\"".concat(attr.name, "\"\n          value={formData.").concat(fieldName, "}\n          onChange={(newValue) => setFormData({ ...formData, ").concat(fieldName, ": newValue })}\n          renderInput={(params) => <TextField {...params} error={!!errors.").concat(fieldName, "} />}\n        />\n      ");
        case 'rich-text':
            return "\n        <Editor\n          value={formData.".concat(fieldName, "}\n          onEditorChange={(content) => setFormData({ ...formData, ").concat(fieldName, ": content })}\n          init={{ height: 300 }}\n        />\n      ");
        case 'file':
            return "\n        <DropzoneArea\n          onChange={(files) => setFormData({ ...formData, ".concat(fieldName, ": files })}\n          acceptedFiles={['image/*', 'application/pdf']}\n          showPreviews={true}\n          maxFileSize={5000000}\n        />\n      ");
        case 'select':
            return "\n        <Select\n          value={formData.".concat(fieldName, "}\n          onChange={(e) => setFormData({ ...formData, ").concat(fieldName, ": e.target.value })}\n          error={!!errors.").concat(fieldName, "}\n        >\n          ").concat((attr.options || []).map(function (opt) {
                return "<MenuItem value=\"".concat(opt.value, "\">").concat(opt.label, "</MenuItem>");
            }).join('\n'), "\n        </Select>\n      ");
        default:
            return "\n        <TextField\n          type=\"".concat(getInputType(attr), "\"\n          label=\"").concat(attr.name, "\"\n          value={formData.").concat(fieldName, "}\n          onChange={(e) => setFormData({ ...formData, ").concat(fieldName, ": e.target.value })}\n          error={!!errors.").concat(fieldName, "}\n          helperText={errors.").concat(fieldName, "?.message}\n          ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? 'required' : '', "\n        />\n      ");
    }
}
/**
 * Generates form fields and required imports for an entity
 * @param {Attribute[]} attributes - List of entity attributes
 * @returns {{ imports: string, fields: string }} Generated imports and field components
 */
function generateFormFields(attributes) {
    var imports = new Set();
    var fields = attributes.map(function (attr) {
        // Add necessary imports based on field type
        switch (attr.dataType.toLowerCase()) {
            case 'date':
                imports.add('import { DatePicker } from "@mui/x-date-pickers";');
                imports.add('import { TextField } from "@mui/material";');
                break;
            case 'rich-text':
                imports.add('import { Editor } from "@tinymce/tinymce-react";');
                break;
            case 'file':
                imports.add('import { DropzoneArea } from "@mui/material-dropzone";');
                break;
            case 'select':
                imports.add('import { Select, MenuItem } from "@mui/material";');
                break;
            default:
                imports.add('import { TextField } from "@mui/material";');
        }
        return "\n      <div className=\"mb-4\">\n        ".concat(generateFieldComponent(attr), "\n      </div>\n    ");
    }).join('\n');
    return {
        imports: Array.from(imports).join('\n'),
        fields: fields
    };
}
/**
 * Determines the HTML input type based on attribute data type
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} HTML input type
 */
function getInputType(attr) {
    switch (attr.dataType.toLowerCase()) {
        case 'number':
        case 'integer':
        case 'decimal':
            return 'number';
        case 'date':
            return 'date';
        case 'boolean':
            return 'checkbox';
        default:
            return 'text';
    }
}
