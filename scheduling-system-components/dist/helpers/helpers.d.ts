/**
 * Helper Functions Module
 * Contains utility functions used across the application
 */
import { Attribute } from "../interfaces/types";
/**
 * Checks if a given SQL data type requires size validation
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs size validation
 */
export declare const needsSizeValidation: (dataType: string) => boolean;
/**
 * Checks if a given SQL data type requires precision specification
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs precision
 */
export declare const needsPrecision: (dataType: string) => boolean;
/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
export declare const getNumericTypeCategory: (dataType: string) => "integer" | "decimal" | "floating" | null;
/**
 * Checks if a primary key exists in the attribute list
 * @param {Attribute[]} attributes - List of attributes to check
 * @param {number | null} editingIndex - Index of attribute being edited (to exclude from check)
 * @returns {boolean} Whether a primary key exists
 */
export declare const isPrimaryKeyExists: (attributes: Attribute[], editingIndex: number | null) => boolean;
/**
 * Checks if any attribute in the list has a PRIMARY KEY constraint
 * @param attrs - List of table attributes to check
 * @returns boolean indicating whether a primary key exists
 */
export declare const hasPrimaryKey: (attrs: Attribute[]) => boolean;
