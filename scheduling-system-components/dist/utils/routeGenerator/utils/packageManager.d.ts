import { Entity } from '../../../interfaces/types';
interface PackageConfig {
    name: string;
    version: string;
    isRequired: boolean;
    dependencies?: string[];
}
export declare function generatePackageImports(config: Entity): {
    packages: PackageConfig[];
    devPackages: {
        name: string;
        version: string;
        isRequired: boolean;
    }[];
};
export {};
