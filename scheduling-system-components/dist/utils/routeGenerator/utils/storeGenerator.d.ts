/**
 * Store Generator Module
 * Generates Zustand store implementations for entity state management
 */
import { Entity } from '../../../interfaces/types';
/**
 * Generates a complete Zustand store implementation for an entity
 *
 * Features:
 * - Type-safe state management
 * - CRUD operations with error handling
 * - Loading states and success/error messages
 * - Pagination and sorting
 * - Field change handlers for different input types
 * - Form reset functionality
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated store implementation
 */
export declare function generateEntityStore(config: Entity): string;
