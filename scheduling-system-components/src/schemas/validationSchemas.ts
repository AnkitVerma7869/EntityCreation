import * as yup from "yup";
import { dataTypeProperties, maxSizes, precisionLimits } from '../constants/dataTypeProperties';
import { needsSizeValidation, needsPrecision } from '../helpers/helpers'

// Updated validation schema for entity name
export const entityNameSchema = yup.string()
  .required("Entity name is required")
  .transform(value => value?.trim())
  .test('no-spaces', 'Spaces are not allowed in entity name', (value: string | undefined): boolean => 
    value ? !value.includes(' ') : true
  )
  .matches(
    /^[a-zA-Z_][a-zA-Z0-9_-]*$/, 
    "Entity name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens"
  )
  .test(
    'min-letters',
    'Entity name must contain at least 2 alphabetic characters',
    (value: string | undefined): boolean => 
      value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true
  )
  .min(2, "Entity name must be at least 2 characters")
  .max(50, "Entity name must not exceed 50 characters");

// Updated validation schema for attribute name
export const attributeNameSchema = yup.string()
  .required("Attribute name is required")
  .transform(value => value?.trim())
  .test('no-spaces', 'Spaces are not allowed in attribute name', (value: string | undefined): boolean => 
    value ? !value.includes(' ') : true
  )
  .matches(
    /^[a-zA-Z_][a-zA-Z0-9_-]*$/, 
    "Attribute name must start with a letter or underscore and can only contain letters, numbers, underscores, and hyphens"
  )
  .test(
    'min-letters',
    'Attribute name must contain at least 2 alphabetic characters',
    (value: string | undefined): boolean => 
      value ? (value.match(/[a-zA-Z]/g) || []).length >= 2 : true
  )
  .min(2, "Attribute name must be at least 2 characters")
  .max(50, "Attribute name must not exceed 50 characters");

// New schemas
export const dataTypeSchema = yup.string()
  .required("Data type is required")
  .test('valid-data-type', 'Invalid data type', (value: string | undefined): boolean => 
    Boolean(value && value.toLowerCase() in dataTypeProperties)
  );

export const sizeSchema = yup.number()
  .nullable()
  .test('size-validation', 'Invalid size', function(value: number | null | undefined): boolean {
    const { dataType } = this.parent as { dataType: string };
    const type = dataType.toLowerCase();
    
    if (!dataType || !needsSizeValidation(dataType)) return true;
    
    // Check if size is required but missing
    if (value === null || value === undefined) {
      return this.createError({ 
        message: `Size is required for ${dataType}` 
      }) as unknown as boolean;
    }
    
    // Check minimum value
    if (value <= 0) {
      return this.createError({ 
        message: 'Size must be greater than 0' 
      }) as unknown as boolean;
    }

    // Check maximum size limits for char and varchar
    if (type === 'char' && value > maxSizes.char) {
      return this.createError({ 
        message: `Maximum size for CHAR is ${maxSizes.char}` 
      }) as unknown as boolean;
    }
    
    if (type === 'varchar' && value > maxSizes.varchar) {
      return this.createError({ 
        message: `Maximum size for VARCHAR is ${maxSizes.varchar}` 
      }) as unknown as boolean;
    }

    return true;
  });

export const precisionSchema = yup.number()
  .nullable()
  .test('precision-validation', 'Invalid precision', function(value: number | null | undefined): boolean {
    const { dataType } = this.parent as { dataType: string };
    
    if (!dataType || !needsPrecision(dataType)) return true;
    if (value === null || value === undefined) {
      return this.createError({ 
        message: `Precision is required for ${dataType}` 
      }) as unknown as boolean;
    }

    const limits = precisionLimits[dataType.toLowerCase()];
    if (limits && (value < limits.min || value > limits.max)) {
      return this.createError({ 
        message: `Precision for ${dataType} must be between ${limits.min} and ${limits.max}` 
      }) as unknown as boolean;
    }

    return true;
  });

// Add new schema for enum values validation
export const enumValuesSchema = yup.array().test(
  'unique-enum-values',
  'Enum values must be unique (case-insensitive)',
  function(values?: Array<{ value: string; label: string }>) {
    if (!values || values.length === 0) return true;

    const lowercaseValues = values.map(v => v.value.toLowerCase());
    const uniqueValues = new Set(lowercaseValues);

    return uniqueValues.size === values.length;
  }
); 