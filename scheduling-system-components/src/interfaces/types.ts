/**
 * Core Type Definitions
 * Contains interfaces and types used throughout the application
 */

/**
 * Defines validation rules for form fields
 * @interface ValidationRule
 */
export interface ValidationRule {
  name: string;          // Name of the validation rule
  label: string;         // Display label for the rule
  hasValue?: boolean;    // Whether rule requires a value
  valueType?: 'string' | 'number' | 'date';  // Type of value expected
  isArray?: boolean;     // Whether value should be an array
  value?: any;          // Actual validation value
  min?: number;         // Minimum value/length
  max?: number;         // Maximum value/length
  minLength?: number;   // Minimum string length
  maxLength?: number;   // Maximum string length
  pattern?: string;     // Regex pattern for validation
  nullable?: boolean;   // Whether field can be null
}

/**
 * Groups validation rules by category
 * @interface ValidationGroup
 */
export interface ValidationGroup {
  group: string;
  validations: ValidationRule[];
}

export interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullable?: boolean;  
  
  [key: string]: any;  // Allow additional validation rules
}

/**
 * Defines attribute properties for table columns
 * @interface Attribute
 */
export interface Attribute {
  name: string;          // Column name
  dataType: string;      // SQL data type
  inputType: string;     // HTML input type
  size: number | null;   // Size for variable length types
  precision: number | null;  // Precision for numeric types
  constraints: string[]; // SQL constraints (PRIMARY KEY, NOT NULL, etc.)
  defaultValue: string | null;  // Default value for the column
  validations: ValidationRules;  // Form validation rules
  options?: Array<{ value: string; label: string }>;  // Options for select/multiselect
  min?: number | null;
  max?: number | null;
  step?: number | null;
  isEditable?: boolean;  // Whether field can be edited
  sortable?: boolean;    // Whether column is sortable
  config?: {             // Additional configuration for specific input types
    accept?: string[];   // Accepted file types
    multiple?: boolean;  // Allow multiple selections
    maxSize?: number;    // Maximum file size
    placeholder?: string;// Placeholder text
    format?: string;     // Date format
    [key: string]: any; // Other config options
  };
  isMultiSelect?: boolean;
  isReadOnly?: boolean;
  displayInList?: boolean;  
  enumType?: string;
}

// Interface for complete entity/table definition
export interface Entity {
  entityName: string;    // Table name
  attributes: Attribute[]; // Table columns
}

// Interface for configuration data
export interface ConfigData {
  entities: Record<string, any>;  // Existing entities
  dataTypes: string[];           // Available SQL data types
  constraints: string[];         // Available SQL constraints
  validations: ValidationGroup[];  // Available validation rules grouped by type
  inputTypes: {
    [key: string]: {
      dataType: string;
      size?: number;
      precision?: number;
      htmlType: string;
      options?: Array<{ value: string; label: string }>;
      min?: number;
      max?: number;
      step?: number;
      isDataTypeFixed?: boolean;
      enumType?: string;
    }
  };      
} 