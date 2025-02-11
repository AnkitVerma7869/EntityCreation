import { Attribute } from '../../../interfaces/types';

export function generateValidationSchema(attributes: Attribute[]) {
  return attributes.map(attr => {
    const fieldName = attr.name.replace(/\s+/g, '_');
    let schema = `${fieldName}: yup.${getYupType(attr)}()`;

    if (attr.validations) {
      const { required, min, max, pattern, minLength, maxLength } = attr.validations;

      if (required) {
        schema += '.required("This field is required")';
      }

      switch (attr.dataType.toLowerCase()) {
        case 'number':
          if (min !== undefined) schema += `.min(${min}, "Minimum value is ${min}")`;
          if (max !== undefined) schema += `.max(${max}, "Maximum value is ${max}")`;
          break;
        
        case 'string':
          if (minLength !== undefined) schema += `.min(${minLength}, "Minimum length is ${minLength}")`;
          if (maxLength !== undefined) schema += `.max(${maxLength}, "Maximum length is ${maxLength}")`;
          if (pattern) schema += `.matches(/${pattern}/, "Invalid format")`;
          break;
        
        case 'date':
          if (min) schema += `.min(new Date("${min}"), "Date must be after ${min}")`;
          if (max) schema += `.max(new Date("${max}"), "Date must be before ${max}")`;
          break;
      }
    }

    return schema;
  }).join(',\n');
}

function getYupType(attr: Attribute): string {
  switch (attr.dataType.toLowerCase()) {
    case 'number':
    case 'integer':
    case 'decimal':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'date';
    default:
      return 'string';
  }
} 