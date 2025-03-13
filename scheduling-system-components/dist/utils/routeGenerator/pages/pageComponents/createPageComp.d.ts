/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */
import { Entity } from '../../../../interfaces/types';
/**
 * Generates a complete create page component for an entity
 * Includes form handling, validation, and API integration
 *
 * Features:
 * - Form validation using Yup
 * - Date formatting for API submission
 * - Toast notifications for feedback
 * - Loading states
 * - Navigation after successful creation
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export declare function generateCreatePage(config: Entity): string;
