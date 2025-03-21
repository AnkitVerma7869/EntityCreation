/**
 * Package Manager Module
 * Manages package dependencies for generated components
 */
import { Entity } from '../../../interfaces/types';
/**
 * Package configuration interface
 * @interface PackageConfig
 */
interface PackageConfig {
    name: string;
    version: string;
    isRequired: boolean;
    dependencies?: string[];
}
interface RouteConfig {
    create?: boolean;
    edit?: boolean;
    list?: boolean;
    view?: boolean;
}
/**
 * Generates package imports for an entity based on enabled routes
 * @param {Entity} config - Entity configuration
 * @param {RouteConfig} routes - Route configuration
 * @returns {{ packages: PackageConfig[], devPackages: PackageConfig[] }} Required packages and dev dependencies
 */
export declare function generatePackageImports(config: Entity, routes?: RouteConfig): {
    packages: PackageConfig[];
    devPackages: {
        name: string;
        version: string;
        isRequired: boolean;
    }[];
};
export {};
