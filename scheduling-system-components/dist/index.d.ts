/**
 * Main Entry Point
 * Exports all public components, utilities, and types
 */
export { default as ManageEntities } from './components/ManageEntities';
export { default as TableForm } from './components/TableForm';
export { default as TableList } from './components/TableList';
export { generateTableRoutes } from './utils/routeGenerator';
export type { Attribute, TableConfig, TableFormProps, TableData, Table } from './types';
/**
 * Predefined entity templates for common use cases
 */
export declare const predefinedEntities: {
    User: {
        name: string;
        dataType: string;
        constraints: string;
    }[];
};
