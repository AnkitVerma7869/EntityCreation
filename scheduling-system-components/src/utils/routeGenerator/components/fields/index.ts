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

function generateSingleField(attr: Attribute, fieldName: string, defaultValue: string | null): string {
  // Format the label for display (e.g., "First Name")
  const fieldLabel = formatFieldLabel(attr.name);
  // Format the field name for form handling (e.g., "first_name")
  const formattedFieldName = formatFieldName(fieldName);
  
  // Create a new attribute with formatted names
  const formattedAttr: Attribute = {
    ...attr,
    name: fieldLabel // Use formatted label for display
  };
  
  // Convert defaultValue to string to handle null case
  const stringDefaultValue = defaultValue?.toString() || '';

  // Check for predefined enum types first
  if (attr.inputType.endsWith('_enum')) {
    // All predefined enums use radio or select based on their config
    switch (attr.inputType) {
        case 'gender_enum':
        case 'customer_type_enum':
          return generateRadioField(formattedAttr, formattedFieldName, stringDefaultValue);
        case 'languages_enum':
        case 'order_status_enum':
        case 'programming_language_enum':
        case 'status_enum':
          return generateSelectField(formattedAttr, formattedFieldName, stringDefaultValue);
        default:
          // For any new enum types, default to select
          return generateSelectField(formattedAttr, formattedFieldName, stringDefaultValue);
    }
  }
  
  switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
    case 'date':
      return generateDateField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'datetime-local':
      return generateDateTimeField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'select':
    case 'multiselect':
      return generateSelectField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'rich-text':
      return generateRichTextField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'file':
      return generateFileField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'email':
      return generateEmailField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'password':
      return generatePasswordField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'checkbox':
      return generateCheckboxField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'radio':
      return generateRadioField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'tel':
      return generateTelField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'url':
      return generateUrlField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'color':
      return generateColorField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'range':
      return generateRangeField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'search':
      return generateSearchField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'hidden':
      return generateHiddenField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'time':
      return generateTimeField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'textarea':
      return generateTextAreaField(formattedAttr, formattedFieldName, stringDefaultValue);
    case 'gender':
      return generateRadioField(formattedAttr, formattedFieldName, stringDefaultValue);
    default:
      return generateTextField(formattedAttr, formattedFieldName, stringDefaultValue);
  }
}

export function generateField(entity: Entity): string {
  const fields = entity.attributes.map(attr => {
    const fieldName = attr.name;
    const defaultValue = attr.defaultValue;
    return generateSingleField(attr, fieldName, defaultValue);
  });

  // Create a typed array for pairedFields
  const pairedFields: string[][] = [];
  
  // Group fields into pairs for two-column layout
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