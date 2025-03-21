import { Entity } from '../../interfaces/types';
/**
 * Generates and saves all necessary routes for a table
 * @param config - Configuration for the table including name and attributes
 * @returns Promise resolving to the API response
 */
export declare function generateTableRoutes(config: Entity): Promise<any>;
export declare function generateRoutes(config: Entity): {
    pages: {
        list: string;
        create: string;
        edit: string;
        view: string;
    };
    store: {
        [x: string]: string;
    };
    schemas: {
        [x: string]: string;
    };
};
