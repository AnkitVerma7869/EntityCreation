import { Entity } from '../interfaces/types';
/**
 * Saves the table configuration through API
 */
export declare function saveTableConfig(config: Entity): Promise<any>;
/**
 * Gets all table configurations
 */
export declare function getAllTables(): Promise<{
    success: boolean;
    data: any;
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
/**
 * Gets a specific table configuration by name
 */
export declare function getTableByName(entityName: string): Promise<any>;
/**
 * Deletes a table configuration
 */
export declare function deleteTable(entityName: string): Promise<any>;
