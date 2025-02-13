import { Entity, Attribute } from '../../../../interfaces/types';
import { generateDateField } from './DateField';
import { generateSelectField } from './SelectField';
import { generateRichTextField } from './RichTextField';
import { generateFileField } from './FileField';
import { generateTextField } from './TextField';

function generateSingleField(attr: Attribute, fieldName: string): string {
  switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
    case 'date':
      return generateDateField(attr, fieldName);
    case 'select':
    case 'multiselect':
      return generateSelectField(attr, fieldName);
    case 'rich-text':
      return generateRichTextField(attr, fieldName);
    case 'file':
      return generateFileField(attr, fieldName);
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
  generateFileField
}; 