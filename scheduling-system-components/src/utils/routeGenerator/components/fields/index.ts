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

// Helper function to format field labels for display
function formatFieldLabel(name: string): string {
  return name
    .split(/[_\s-]+/)  // Split by underscore, space, and hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Helper function to format field names for form handling
function formatFieldName(name: string): string {
  // Keep original name but ensure it's a valid identifier
  // This preserves hyphenated names for proper form handling
  return name
    .trim()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    
}

function generateSingleField(attr: Attribute, fieldName: string, defaultValue: string | null = null): string {
  // Format the label for display (e.g., "First Name")
  const fieldLabel = formatFieldLabel(attr.name);
  
  // Keep original field name structure but ensure it's valid
  const formattedFieldName = formatFieldName(fieldName);
  
  // Create a new attribute with formatted names
  const formattedAttr: Attribute = {
    ...attr,
    name: fieldLabel // Use formatted label for display
  };

  // Handle defaultValue
  const defaultVal = defaultValue || attr.defaultValue || '';

    // Check for predefined enum types first
    if (attr.inputType.endsWith('_enum')) {
      // All predefined enums use radio or select based on their config
      switch (attr.inputType) {
        case 'gender_enum':
        case 'customer_type_enum':
          return generateRadioField(formattedAttr, formattedFieldName, defaultVal);
        case 'languages_enum':
        case 'order_status_enum':
        case 'programming_language_enum':
        case 'status_enum':
          return generateSelectField(formattedAttr, formattedFieldName, defaultVal);
        default:
          // For any new enum types, default to select
          return generateSelectField(formattedAttr, formattedFieldName, defaultVal);
      }
    }
  
  switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
    case 'date':
      return generateDateField(formattedAttr, formattedFieldName, defaultVal);
    case 'datetime-local':
      return generateDateTimeField(formattedAttr, formattedFieldName, defaultVal);
    case 'select':
    case 'multiselect':
      return generateSelectField(formattedAttr, formattedFieldName, defaultVal);
    case 'rich-text':
      return generateRichTextField(formattedAttr, formattedFieldName, defaultVal);
    case 'file':
      return generateFileField(formattedAttr, formattedFieldName, defaultVal);
    case 'email':
      return generateEmailField(formattedAttr, formattedFieldName, defaultVal);
    case 'password':
      return generatePasswordField(formattedAttr, formattedFieldName, defaultVal);
    case 'checkbox':
      return generateCheckboxField(formattedAttr, formattedFieldName, defaultVal);
    case 'radio':
      return generateRadioField(formattedAttr, formattedFieldName, defaultVal);
    case 'tel':
      return generateTelField(formattedAttr, formattedFieldName, defaultVal);
    case 'url':
      return generateUrlField(formattedAttr, formattedFieldName, defaultVal);
    case 'color':
      return generateColorField(formattedAttr, formattedFieldName, defaultVal);
    case 'range':
      return generateRangeField(formattedAttr, formattedFieldName, defaultVal);
    case 'search':
      return generateSearchField(formattedAttr, formattedFieldName, defaultVal);
    case 'hidden':
      return generateHiddenField(formattedAttr, formattedFieldName, defaultVal);
    case 'time':
      return generateTimeField(formattedAttr, formattedFieldName, defaultVal);
    case 'textarea':
      return generateTextAreaField(formattedAttr, formattedFieldName, defaultVal);
    case 'gender':
      return generateRadioField(formattedAttr, formattedFieldName, defaultVal);
    default:
      return generateTextField(formattedAttr, formattedFieldName);
  }
}

export function generateField(entity: Entity): string {
  const fields = entity.attributes.map(attr => 
    generateSingleField(attr, attr.name, attr.defaultValue || null)
  );

  // Group fields into pairs for two-column layout
  const pairedFields: string[][] = [];
  for (let i = 0; i < fields.length; i += 2) {
    const pair: string[] = [fields[i]];
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