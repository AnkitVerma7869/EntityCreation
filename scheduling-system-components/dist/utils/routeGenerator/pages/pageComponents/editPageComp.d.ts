/**
 * Edit Page Component Generator
 * Generates React components for editing existing entity records
 */
import { Attribute, Entity } from '../../../../interfaces/types';
/**
 * Generates a complete edit page component for an entity
 * Includes form handling, data fetching, validation, and API integration
 *
 * Features:
 * - Data fetching and population
 * - Form validation using Yup
 * - Date format conversion
 * - Toast notifications
 * - Loading states
 * - Navigation after successful update
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export declare function generateEditPage(config: Entity): string;
/**
 * Generates a reusable edit form component
 * Can be used for both create and edit operations
 *
 * @param {string} entityName - Name of the entity
 * @param {Attribute[]} attributes - Entity attributes
 * @returns {string} Generated component code
 */
export declare function generateEditPageComponent(entityName: string, attributes: Attribute[]): string;
