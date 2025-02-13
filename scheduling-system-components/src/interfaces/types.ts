// Interface for validation rules
export interface ValidationRule {
  name: string;
  label: string;
  hasValue?: boolean;
  valueType?: 'string' | 'number' | 'date';
  isArray?: boolean;
  value?: any;
}

export interface ValidationGroup {
  group: string;
  validations: ValidationRule[];
}

export interface ValidationRules {
  required?: boolean;
  [key: string]: any;  // Allow additional validation rules
}

// Interface for table column attributes
export interface Attribute {
  name: string;          
  dataType: string;   
  inputType?: string; 
  size: number | null;   
  precision: number | null; 
  constraints: string[]; 
  defaultValue: string | null; 
  validations: ValidationRules; 
  options?: Array<{ value: string; label: string }>;
  min?: number | null;
  max?: number | null;
  step?: number | null;
  isEditable?: boolean;
  sortable?: boolean;  // Options for select/multiselect
  config?: {             // Additional configuration for specific input types
    accept?: string[];   // Accepted file types
    multiple?: boolean;  // Allow multiple selections
    maxSize?: number;    // Maximum file size
    placeholder?: string;// Placeholder text
    format?: string;     // Date format
    [key: string]: any; // Other config options
  };
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
    }
  };      
} 