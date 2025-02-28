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
/**
 * Generates package imports for an entity
 * @param {Entity} config - Entity configuration
 * @returns {{ packages: PackageConfig[], devPackages: PackageConfig[] }} Required packages and dev dependencies
 */
export declare function generatePackageImports(config: Entity): {
    packages: PackageConfig[];
    devPackages: {
        name: string;
        version: string;
        isRequired: boolean;
    }[];
};
export {};
