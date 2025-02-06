// Interface for validation rules
export interface ValidationRules {
  required?: boolean;
  [key: string]: any;  // Allow additional validation rules
}

// Interface for table column attributes
export interface Attribute {
  name: string;          // Column name
  dataType: string;      // SQL data type
  size: number | null;   // Size/length for types that support it
  precision: number | null; // Decimal precision
  constraints: string[]; // SQL constraints (e.g., PRIMARY KEY, NOT NULL)
  defaultValue: string | null; // Default value for the column
  validations: ValidationRules; // Frontend validation rules
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
  validations: string[];        // Available validation rules
} 