/**
 * Main Entry Point
 * Exports all public components, utilities, and types
 */

// Component exports
export { default as ManageEntities } from './components/ManageEntities';
export { default as TableForm } from './components/TableForm';
export { default as TableList } from './components/TableList';

// Utility exports
export { generateTableRoutes } from './utils/routeGenerator';
export { saveTableConfig } from './utils/tableGenerator';
export { createClientApiMethods } from './utils/clientApiMethods';
export type { ApiMethods } from './interfaces/types';

// Type exports
export type {
  Attribute,
  TableConfig,
  TableFormProps,
  TableData,
  Table
} from './types';

/**
 * Predefined entity templates for common use cases
 */
export const predefinedEntities = {
  "User": [
    { name: "id", dataType: "uuid", constraints: "PRIMARY KEY" },
    { name: "username", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
    { name: "email", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
  ],
}; 
    