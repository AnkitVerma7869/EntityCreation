/**
 * List Page Component Generator
 * Generates a React component for displaying and managing entity records in a data grid
 */
import { Entity } from '../../../../interfaces/types';
/**
 * Generates a list page component for an entity
 * Includes data grid, search, pagination, sorting, and CRUD operations
 *
 * Features:
 * - Server-side pagination and sorting
 * - Search functionality
 * - Date formatting
 * - Edit and delete actions
 * - Responsive grid layout
 * - Loading states
 * - Error handling
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export declare function generateListPage(config: Entity): string;
