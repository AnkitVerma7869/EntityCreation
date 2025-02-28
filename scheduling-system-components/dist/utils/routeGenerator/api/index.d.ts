/**
 * API Route Generator Module
 * Generates Next.js API routes for CRUD operations on entities
 */
import { Entity } from '../../../interfaces/types';
/**
 * Exports all API route generators as a single object
 * @param {Entity} config - Entity configuration
 * @returns {Object} Object containing all API route implementations
 */
export declare const generateApiRoutes: (config: Entity) => {
    list: string;
    create: string;
    edit: string;
    view: string;
    delete: string;
};
