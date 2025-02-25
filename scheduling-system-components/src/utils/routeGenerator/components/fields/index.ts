import { Entity, Attribute } from '../../../../interfaces/types';
import { generateDateField } from './DateField';
import { generateSelectField } from './SelectField';
import { generateRichTextField } from './RichTextField';
import { generateFileField } from './FileField';
import { generateTextField } from './TextField';
import { generateEmailField } from './EmailField';
import { generatePasswordField } from './PasswordField';
import { generateDateTimeField } from './DateTimeField';
import { generateCheckboxField } from './CheckboxField';
import { generateRadioField } from './RadioField';
import { generateTelField } from './TelField';
import { generateUrlField } from './UrlField';
import { generateColorField } from './ColorField';
import { generateRangeField } from './RangeField';
import { generateSearchField } from './SearchField';
import { generateHiddenField } from './HiddenField';
import { generateTimeField } from './TimeField';
import { generateTextAreaField } from './TextAreaField';

// Helper function to format field labels (e.g., "first_name" to "First Name")
function formatFieldLabel(name: string): string {
  return name
    // Split by underscore and space
    .split(/[_\s]+/)
    // Capitalize first letter of each word
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    // Join with space
    .join(' ');
}

// Helper function to format field names for form handling (keeps original format but ensures valid identifier)
function formatFieldName(name: string): string {
  return name
    // Replace any invalid characters with underscore
    .replace(/[^a-zA-Z0-9_]/g, '_')
    // Remove multiple consecutive underscores
    .replace(/_+/g, '_')
    // Remove leading/trailing underscores
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
}

function generateSingleField(attr: Attribute, fieldName: string): string {
  // Format the label for display (e.g., "First Name")
  const fieldLabel = formatFieldLabel(attr.name);
  // Format the field name for form handling (e.g., "first_name")
  const formattedFieldName = formatFieldName(fieldName);
  
  // Create a new attribute with formatted names
  const formattedAttr: Attribute = {
    ...attr,
    name: fieldLabel // Use formatted label for display
  };
  
  switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
    case 'date':
      return generateDateField(formattedAttr, formattedFieldName);
    case 'datetime-local':
      return generateDateTimeField(formattedAttr, formattedFieldName);
    case 'select':
    case 'multiselect':
      return generateSelectField(formattedAttr, formattedFieldName);
    case 'rich-text':
      return generateRichTextField(formattedAttr, formattedFieldName);
    case 'file':
      return generateFileField(formattedAttr, formattedFieldName);
    case 'email':
      return generateEmailField(formattedAttr, formattedFieldName);
    case 'password':
      return generatePasswordField(formattedAttr, formattedFieldName);
    case 'checkbox':
      return generateCheckboxField(formattedAttr, formattedFieldName);
    case 'radio':
      return generateRadioField(formattedAttr, formattedFieldName);
    case 'tel':
      return generateTelField(formattedAttr, formattedFieldName);
    case 'url':
      return generateUrlField(formattedAttr, formattedFieldName);
    case 'color':
      return generateColorField(formattedAttr, formattedFieldName);
    case 'range':
      return generateRangeField(formattedAttr, formattedFieldName);
    case 'search':
      return generateSearchField(formattedAttr, formattedFieldName);
    case 'hidden':
      return generateHiddenField(formattedAttr, formattedFieldName);
    case 'time':
      return generateTimeField(formattedAttr, formattedFieldName);
    case 'textarea':
      return generateTextAreaField(formattedAttr, formattedFieldName);
    case 'gender':
      return generateRadioField(formattedAttr, formattedFieldName);
    default:
      return generateTextField(formattedAttr, formattedFieldName);
  }
}

export function generateField(entity: Entity): string {
  const fields = entity.attributes.map(attr => {
    const fieldName = attr.name;
    return generateSingleField(attr, fieldName);
  });

  // Group fields into pairs for two-column layout
  const pairedFields = [];
  for (let i = 0; i < fields.length; i += 2) {
    const pair = [fields[i]];
    if (i + 1 < fields.length) {
      pair.push(fields[i + 1]);
    }
    pairedFields.push(pair);
  }

  // Generate the grid layout
  return pairedFields.map(pair => `
    <div className="mb-3 flex flex-col gap-6 xl:flex-row">
      <div className="w-full xl:w-1/2">
        ${pair[0]}
      </div>
      ${pair[1] ? `
      <div className="w-full xl:w-1/2">
        ${pair[1]}
      </div>
      ` : ''}
    </div>
  `).join('\n');
}

export {
  generateDateField,
  generateSelectField,
  generateRichTextField,
  generateFileField,
  generateEmailField,
  generatePasswordField,
  generateDateTimeField,
  generateCheckboxField,
  generateRadioField,
  generateTelField,
  generateUrlField,
  generateColorField,
  generateRangeField,
  generateSearchField,
  generateHiddenField,
  generateTimeField,
  generateTextAreaField
}; 