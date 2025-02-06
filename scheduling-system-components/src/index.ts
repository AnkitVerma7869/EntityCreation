// Components
export { default as ManageEntities } from './components/ManageEntities';
export { default as TableForm } from './components/TableForm';
export { default as TableList } from './components/TableList';

// Utils
export { generateTableRoutes } from './utils/routeGenerator';
export { saveTableConfig } from './utils/tableGenerator';

// Types
export type {
  Attribute,
  TableConfig,
  TableFormProps,
  TableData,
  Table
} from './types';

// Constants and Configurations
export const predefinedEntities = {
  "User": [
    { name: "id", dataType: "uuid", constraints: "PRIMARY KEY" },
    { name: "username", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
    { name: "email", dataType: "varchar", constraints: "UNIQUE NOT NULL" },
    
  ],
  
}; 
    