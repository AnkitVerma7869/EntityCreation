import { Attribute } from '../../../interfaces/types';

export function generateValidationSchema(attributes: Attribute[]) {
  return attributes.map(attr => {
    const fieldName = attr.name.replace(/\s+/g, '_');
    const yupType = getYupType(attr);
    
    // Start with the type declaration
    let schema = `${fieldName}: yup.${yupType}()`;

    // For checkbox with options, add validation for array of strings
    if (attr.inputType.toLowerCase() === 'checkbox' && Array.isArray(attr.options) && attr.options.length > 0) {
      schema = `${fieldName}: yup.array().of(yup.string())`;
      
      if (attr.validations?.required) {
        schema += '.min(1, "Please select at least one option")';
      }
      
      if (attr.validations?.min !== undefined) {
        schema += `.min(${attr.validations.min}, "Please select at least ${attr.validations.min} options")`;
      }
      
      if (attr.validations?.max !== undefined) {
        schema += `.max(${attr.validations.max}, "Please select at most ${attr.validations.max} options")`;
      }
      
      return schema;
    }

    // Add typeError based on the field type
    if (yupType === 'number') {
      schema += `.typeError("${attr.name} must be a number")`;
    } else if (yupType === 'date') {
      schema += `.typeError("${attr.name} must be a valid date")`;
    }

    if (attr.validations) {
      // Debug log for validations
      console.log('Validations for', attr.name, ':', attr.validations);

      // Add required validation if needed
      if (attr.validations.required) {
        schema += '.required("This field is required")';
      }

      // Handle nullable validation
      if (attr.validations.nullable) {
        schema += '.nullable()';
      }

      // Handle string-specific validations
      if (yupType === 'string') {
        if (attr.validations.trim) schema += '.trim()';
        if (attr.validations.lowercase) schema += '.lowercase()';
        if (attr.validations.uppercase) schema += '.uppercase()';
        if (attr.validations.matches) schema += `.matches(/${attr.validations.matches}/, "Invalid format")`;
        if (attr.validations.uuid) schema += '.uuid("Invalid UUID format")';
        if (attr.validations.url) schema += '.url("Invalid URL format")';
        if (attr.validations.email || attr.inputType.toLowerCase() === 'email') {
          schema += '.email("Invalid email format")';
        }
      }

      // Handle number-specific validations
      if (yupType === 'number') {
        if (attr.validations.integer) schema += '.integer("Must be an integer")';
        if (attr.validations.positive) schema += '.positive("Must be a positive number")';
        if (attr.validations.negative) schema += '.negative("Must be a negative number")';
        if (attr.validations.lessThan !== undefined) {
          schema += `.lessThan(${attr.validations.lessThan}, "Must be less than ${attr.validations.lessThan}")`;
        }
        if (attr.validations.moreThan !== undefined) {
          schema += `.moreThan(${attr.validations.moreThan}, "Must be more than ${attr.validations.moreThan}")`;
        }
      }

      // Handle boolean-specific validations
      if (yupType === 'boolean') {
        if (attr.validations.isTrue) schema += '.isTrue("Must be true")';
        if (attr.validations.isFalse) schema += '.isFalse("Must be false")';
      }

      // Handle array-specific validations
      if (attr.validations.isArray) {
        schema += '.array()';
        if (attr.validations.length !== undefined) {
          schema += `.length(${attr.validations.length}, "Must have exactly ${attr.validations.length} items")`;
        }
      }

      // Handle oneOf and notOneOf validations
      if (attr.validations.oneOf) {
        const values = Array.isArray(attr.validations.oneOf) ? attr.validations.oneOf : [attr.validations.oneOf];
        schema += `.oneOf([${values.map(v => JSON.stringify(v)).join(', ')}], "Must be one of the allowed values")`;
      }
      if (attr.validations.notOneOf) {
        const values = Array.isArray(attr.validations.notOneOf) ? attr.validations.notOneOf : [attr.validations.notOneOf];
        schema += `.notOneOf([${values.map(v => JSON.stringify(v)).join(', ')}], "Must not be one of these values")`;
      }

      // Handle min/max validations based on type
      if (attr.validations.min !== undefined || attr.validations.max !== undefined) {
        const type = yupType;
        if (type === 'string') {
          if (attr.validations.min !== undefined) {
            schema += `.min(${attr.validations.min}, "Must be at least ${attr.validations.min} characters")`;
          }
          if (attr.validations.max !== undefined) {
            schema += `.max(${attr.validations.max}, "Must be at most ${attr.validations.max} characters")`;
          }
        } else if (type === 'number') {
          if (attr.validations.min !== undefined) {
            schema += `.min(${attr.validations.min}, "Must be at least ${attr.validations.min}")`;
          }
          if (attr.validations.max !== undefined) {
            schema += `.max(${attr.validations.max}, "Must be at most ${attr.validations.max}")`;
          }
        } else if (type === 'date') {
          if (attr.validations.min) {
            schema += `.min(new Date("${attr.validations.min}"), "Date must be after ${attr.validations.min}")`;
          }
          if (attr.validations.max) {
            schema += `.max(new Date("${attr.validations.max}"), "Date must be before ${attr.validations.max}")`;
          }
        }
      }

      // Handle constraints
      if (attr.constraints) {
        if (attr.constraints.includes('unique')) {
          // Note: Unique constraint typically handled at database level
          schema += `.test('unique', '${attr.name} must be unique', async (value) => {
            if (!value) return true;
            // Implement unique check logic here
            return true;
          })`;
        }
      }
    }

    console.log('Generated schema for', attr.name, ':', schema);
    return schema;
  }).join(',\n');
}

function getYupType(attr: Attribute): string {
  const inputType = attr.inputType.toLowerCase();
  const dataType = attr.dataType.toLowerCase();
  
  // Handle checkbox as array when it has options
  if (inputType === 'checkbox' && Array.isArray(attr.options) && attr.options.length > 0) {
    return 'array';
  }
  
  // Single checkbox without options is boolean
  if (inputType === 'checkbox') {
    return 'boolean';
  }
  
  // Always treat number input type as number regardless of dataType
  if (inputType === 'number') return 'number';
  
  // Handle other special input types
  if (inputType === 'datetime-local' || inputType === 'date') return 'date';
  
  // Then handle data types
  if (['number', 'integer', 'decimal', 'numeric', 'float', 'double', 'real', 'smallint', 'bigint'].includes(dataType)) {
    return 'number';
  }
  if (['date', 'timestamp', 'datetime'].includes(dataType)) {
    return 'date';
  }
  if (dataType === 'boolean') {
    return 'boolean';
  }
  if (dataType === 'array' || attr.validations?.isArray) {
    return 'array';
  }
  
  // Default to string for all other types
  return 'string';
} 