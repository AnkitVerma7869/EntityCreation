/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */
import { Attribute, ConfigData, Entity } from '../interfaces/types';
/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 *
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
export declare const formatArrayToString: (arr: string[] | undefined) => string;
/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
export declare const initialAttributeState: Attribute;
/**
 * Fetches entity configuration from JSON file
 * Contains input types, data types, and other configuration options
 *
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
export declare function fetchEntityConfig(): Promise<ConfigData>;
/**
 * Saves entity configuration to backend API and generates corresponding routes
 *
 * Features:
 * - Transforms entity data to match API requirements
 * - Handles special input types (e.g., gender)
 * - Sets up validations and constraints
 * - Generates frontend routes
 * - Provides error handling
 *
 *
 * @param {Entity} entity - Entity configuration to save
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call or route generation fails
 */
export declare function saveEntity(entity: Entity): Promise<{
    message: string;
    success: boolean;
}>;
