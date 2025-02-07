import { Attribute } from "../interfaces/types";
/**
 * Checks if a given SQL data type requires size validation
 * @param dataType - The SQL data type to check (e.g., varchar, char)
 * @returns boolean indicating whether the type needs size validation
 */
export declare const needsSizeValidation: (dataType: string) => boolean;
/**
 * Checks if a given SQL data type requires precision specification
 * @param dataType - The SQL data type to check (e.g., decimal, numeric)
 * @returns boolean indicating whether the type needs precision
 */
export declare const needsPrecision: (dataType: string) => boolean;
/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
export declare const getNumericTypeCategory: (dataType: string) => "integer" | "decimal" | "floating" | null;
/**
 * Checks if a primary key already exists in the attributes list, excluding the currently editing attribute
 * @param attributes - List of table attributes
 * @param editingIndex - Index of the attribute currently being edited (if any)
 * @returns boolean indicating whether a primary key exists in other attributes
 */
export declare const isPrimaryKeyExists: (attributes: Attribute[], editingIndex: number | null) => boolean;
/**
 * Checks if any attribute in the list has a PRIMARY KEY constraint
 * @param attrs - List of table attributes to check
 * @returns boolean indicating whether a primary key exists
 */
export declare const hasPrimaryKey: (attrs: Attribute[]) => boolean;
