/**
 * Form Generator Module
 * Generates React form components based on entity attributes
 */

import { Attribute } from '../../../interfaces/types';

/**
 * Generates a form field component based on attribute type
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} Generated JSX for the field component
 */
function generateFieldComponent(attr: Attribute): string {
  const fieldName = attr.name.replace(/\s+/g, '_');
  
  switch (attr.dataType.toLowerCase()) {
    case 'date':
      return `
        <DatePicker
          label="${attr.name}"
          value={formData.${fieldName}}
          onChange={(newValue) => setFormData({ ...formData, ${fieldName}: newValue })}
          renderInput={(params) => <TextField {...params} error={!!errors.${fieldName}} />}
        />
      `;
    
    case 'rich-text':
      return `
        <Editor
          value={formData.${fieldName}}
          onEditorChange={(content) => setFormData({ ...formData, ${fieldName}: content })}
          init={{ height: 300 }}
        />
      `;
    
    case 'file':
      return `
        <DropzoneArea
          onChange={(files) => setFormData({ ...formData, ${fieldName}: files })}
          acceptedFiles={['image/*', 'application/pdf']}
          showPreviews={true}
          maxFileSize={5000000}
        />
      `;
    
    case 'select':
      return `
        <Select
          value={formData.${fieldName}}
          onChange={(e) => setFormData({ ...formData, ${fieldName}: e.target.value })}
          error={!!errors.${fieldName}}
        >
          ${(attr.options || []).map(opt => 
            `<MenuItem value="${opt.value}">${opt.label}</MenuItem>`
          ).join('\n')}
        </Select>
      `;
    
    default:
      return `
        <TextField
          type="${getInputType(attr)}"
          label="${attr.name}"
          value={formData.${fieldName}}
          onChange={(e) => setFormData({ ...formData, ${fieldName}: e.target.value })}
          error={!!errors.${fieldName}}
          helperText={errors.${fieldName}?.message}
          ${attr.validations?.required ? 'required' : ''}
        />
      `;
  }
}

/**
 * Generates form fields and required imports for an entity
 * @param {Attribute[]} attributes - List of entity attributes
 * @returns {{ imports: string, fields: string }} Generated imports and field components
 */
export function generateFormFields(attributes: Attribute[]) {
  const imports = new Set<string>();
  
  const fields = attributes.map(attr => {
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

    return `
      <div className="mb-4">
        ${generateFieldComponent(attr)}
      </div>
    `;
  }).join('\n');

  return {
    imports: Array.from(imports).join('\n'),
    fields
  };
}

/**
 * Determines the HTML input type based on attribute data type
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} HTML input type
 */
function getInputType(attr: Attribute): string {
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