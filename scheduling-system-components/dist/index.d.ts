export { default as ManageEntities } from './components/ManageEntities';
export { default as TableForm } from './components/TableForm';
export { default as TableList } from './components/TableList';
export { generateTableRoutes } from './utils/routeGenerator';
export { saveTableConfig } from './utils/tableGenerator';
export type { Attribute, TableConfig, TableFormProps, TableData, Table } from './types';
export declare const predefinedEntities: {
    User: {
        name: string;
        dataType: string;
        constraints: string;
    }[];
};
