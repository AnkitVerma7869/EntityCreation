"use strict";
/**
 * Package Manager Module
 * Manages package dependencies for generated components
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePackageImports = generatePackageImports;
/**
 * Gets required packages based on field types and route configuration
 * @param {Attribute[]} attributes - List of entity attributes
 * @param {RouteConfig} routes - Route configuration
 * @returns {PackageConfig[]} List of required packages
 */
function getFieldSpecificPackages(attributes, routes) {
    var packages = [];
    // Only include field-specific packages if create or edit routes are enabled
    if (routes.create || routes.edit) {
        attributes.forEach(function (attr) {
            // Add packages based on input/data type
            switch (attr.inputType.toLowerCase() || attr.dataType.toLowerCase()) {
                case 'date':
                    packages.push({
                        name: 'flatpickr',
                        version: '^4.6.13',
                        isRequired: true
                    });
                    packages.push({
                        name: '@types/flatpickr',
                        version: '^3.1.2',
                        isRequired: true
                    });
                    break;
                case 'rich-text':
                    packages.push({
                        name: '@tinymce/tinymce-react',
                        version: '^4.0.0',
                        isRequired: true
                    });
                    break;
                case 'file':
                    packages.push({
                        name: '@mui/material-dropzone',
                        version: '^5.0.0',
                        isRequired: true
                    });
                    break;
                case 'phone':
                    packages.push({
                        name: 'react-phone-input-2',
                        version: '^2.15.1',
                        isRequired: true
                    });
                    break;
                case 'select':
                case 'multiselect':
                    packages.push({
                        name: '@mui/material',
                        version: '^5.14.0',
                        isRequired: true
                    });
                    break;
            }
            // Add validation packages if needed
            if (attr.validations) {
                if (attr.validations.required || attr.validations.pattern || attr.validations.min || attr.validations.max) {
                    packages.push({
                        name: 'yup',
                        version: '^1.3.2',
                        isRequired: true
                    });
                    packages.push({
                        name: '@hookform/resolvers',
                        version: '^3.3.2',
                        isRequired: true
                    });
                }
            }
        });
    }
    return packages;
}
/**
 * Gets route-specific packages based on enabled routes
 * @param {RouteConfig} routes - Route configuration
 * @returns {PackageConfig[]} List of required packages
 */
function getRouteSpecificPackages(routes) {
    var packages = [];
    // List view specific packages
    if (routes.list) {
        packages.push({
            name: '@mui/x-data-grid',
            version: '^6.18.0',
            isRequired: true
        }, {
            name: 'lucide-react',
            version: '^0.309.0',
            isRequired: true
        });
    }
    // Form handling packages for create/edit
    if (routes.create || routes.edit) {
        packages.push({
            name: 'react-hook-form',
            version: '^7.48.0',
            isRequired: true
        }, {
            name: 'yup',
            version: '^1.3.2',
            isRequired: true
        }, {
            name: '@hookform/resolvers',
            version: '^3.3.2',
            isRequired: true
        }, {
            name: 'react-hot-toast',
            version: '^2.4.1',
            isRequired: true
        });
    }
    // View specific packages
    if (routes.view) {
        packages.push({
            name: 'lucide-react',
            version: '^0.309.0',
            isRequired: true
        });
    }
    return packages;
}
/**
 * Generates package imports for an entity based on enabled routes
 * @param {Entity} config - Entity configuration
 * @param {RouteConfig} routes - Route configuration
 * @returns {{ packages: PackageConfig[], devPackages: PackageConfig[] }} Required packages and dev dependencies
 */
function generatePackageImports(config, routes) {
    if (routes === void 0) { routes = { create: true, edit: true, list: true, view: true }; }
    // Define core packages required for all routes
    var corePackages = {
        'react': {
            name: 'react',
            version: '^18.0.0',
            isRequired: true
        },
        'react-dom': {
            name: 'react-dom',
            version: '^18.0.0',
            isRequired: true
        },
        'next': {
            name: 'next',
            version: '^13.0.0',
            isRequired: true
        }
    };
    // Get route-specific packages
    var routePackages = getRouteSpecificPackages(routes);
    // Get field-specific packages
    var fieldPackages = getFieldSpecificPackages(config.attributes, routes);
    // Merge all packages
    var allPackages = __spreadArray(__spreadArray(__spreadArray([], Object.values(corePackages), true), routePackages, true), fieldPackages, true);
    var uniquePackages = {};
    // Remove duplicates and merge dependencies
    allPackages.forEach(function (pkg) {
        if (!uniquePackages[pkg.name]) {
            uniquePackages[pkg.name] = pkg;
        }
        // Add dependencies if they exist
        if (pkg.dependencies) {
            pkg.dependencies.forEach(function (dep) {
                if (!uniquePackages[dep]) {
                    uniquePackages[dep] = {
                        name: dep,
                        version: pkg.version,
                        isRequired: true
                    };
                }
            });
        }
    });
    return {
        packages: Object.values(uniquePackages).filter(function (pkg) { return pkg.isRequired; }),
        devPackages: [
            {
                name: '@types/react',
                version: '^18.0.0',
                isRequired: true
            },
            {
                name: '@types/node',
                version: '^18.0.0',
                isRequired: true
            },
            {
                name: 'typescript',
                version: '^5.0.0',
                isRequired: true
            }
        ]
    };
}
