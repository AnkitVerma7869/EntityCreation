// Helper to determine which data types need size/precision
export const dataTypeProperties: Record<string, { 
  needsSize: boolean; 
  needsPrecision: boolean;
}> = {
  // Character types with size
  char: { needsSize: false, needsPrecision: false },
  varchar: { needsSize: true, needsPrecision: false },
  text: { needsSize: false, needsPrecision: false },
  
  // Numeric types with precision
  decimal: { needsSize: true, needsPrecision: true },
  numeric: { needsSize: true, needsPrecision: true },
  
  // Time types with precision
  timestamp: { needsSize: true, needsPrecision: false },
  time: { needsSize: true, needsPrecision: false },
  interval: { needsSize: true, needsPrecision: false},
  date: { needsSize: false, needsPrecision: false },
  
  // Fixed size numeric types
  smallint: { needsSize: false, needsPrecision: false },
  integer: { needsSize: false, needsPrecision: false },
  bigint: { needsSize: false, needsPrecision: false },
  real: { needsSize: false, needsPrecision: false },
  'double precision': { needsSize: false, needsPrecision: false },
  serial: { needsSize: false, needsPrecision: false },
  boolean: { needsSize: false, needsPrecision: false },
  bytea: { needsSize: false, needsPrecision: false },
  enum: { needsSize: false, needsPrecision: false },
  point: { needsSize: false, needsPrecision: false },
  line: { needsSize: false, needsPrecision: false },
  lseg: { needsSize: false, needsPrecision: false },
  box: { needsSize: false, needsPrecision: false },
  path: { needsSize: false, needsPrecision: false },
  polygon: { needsSize: false, needsPrecision: false },
  circle: { needsSize: false, needsPrecision: false },
  cidr: { needsSize: false, needsPrecision: false },
  inet: { needsSize: false, needsPrecision: false },
  macaddr: { needsSize: false, needsPrecision: false },
  uuid: { needsSize: false, needsPrecision: false },
  json: { needsSize: false, needsPrecision: false },
  jsonb: { needsSize: false, needsPrecision: false },
  array: { needsSize: false, needsPrecision: false },
  range: { needsSize: false, needsPrecision: false },
  composite: { needsSize: false, needsPrecision: false },
  tsquery: { needsSize: false, needsPrecision: false },
  tsvector: { needsSize: false, needsPrecision: false },
  color: { needsSize: false, needsPrecision: false }
};

export const maxSizes: Record<string, number> = {
  char: 255,        // Maximum size for CHAR
  varchar: 2147483647,   // Maximum size for VARCHAR in most databases
};

export const precisionLimits: Record<string, { min: number; max: number }> = {
  decimal: { min: 0, max: 1000 },
  numeric: { min: 0, max: 1000 },
  timestamp: { min: 0, max: 6 },
  time: { min: 0, max: 6 },
  interval: { min: 0, max: 6 }
};

export const disabledOptionClass = "bg-meta-1/10 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-meta-1/20"; 