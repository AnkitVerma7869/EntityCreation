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

function generateSingleField(attr: Attribute, fieldName: string): string {
  switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
    case 'date':
      return generateDateField(attr, fieldName);
    case 'datetime-local':
      return generateDateTimeField(attr, fieldName);
    case 'select':
    case 'multiselect':
      return generateSelectField(attr, fieldName);
    case 'rich-text':
      return generateRichTextField(attr, fieldName);
    case 'file':
      return generateFileField(attr, fieldName);
    case 'email':
      return generateEmailField(attr, fieldName);
    case 'password':
      return generatePasswordField(attr, fieldName);
    case 'checkbox':
      return generateCheckboxField(attr, fieldName);
    case 'radio':
      return generateRadioField(attr, fieldName);
    case 'tel':
      return generateTelField(attr, fieldName);
    case 'url':
      return generateUrlField(attr, fieldName);
    case 'color':
      return generateColorField(attr, fieldName);
    case 'range':
      return generateRangeField(attr, fieldName);
    case 'search':
      return generateSearchField(attr, fieldName);
    case 'hidden':
      return generateHiddenField(attr, fieldName);
    default:
      return generateTextField(attr, fieldName);
  }
}

export function generateField(entity: Entity): string {
  const fields = entity.attributes.map(attr => {
    const fieldName = attr.name.replace(/\s+/g, '_');
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
  generateHiddenField
}; 