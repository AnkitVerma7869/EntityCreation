/**
 * Helper Functions Module
 * Contains utility functions used across the application
 */

import { Attribute } from "../interfaces/types";
import { dataTypeProperties } from "../constants/dataTypeProperties";

/**
 * Checks if a given SQL data type requires size validation
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs size validation
 */
export const needsSizeValidation = (dataType: string): boolean => {
  const type = dataType.toLowerCase();
  return dataTypeProperties[type]?.needsSize ?? false;
};

/**
 * Checks if a given SQL data type requires precision specification
 * @param {string} dataType - The SQL data type to check
 * @returns {boolean} Whether the type needs precision
 */
export const needsPrecision = (dataType: string): boolean => {
  const type = dataType.toLowerCase();
  return dataTypeProperties[type]?.needsPrecision ?? false;
};

/**
 * Categorizes numeric SQL data types into their respective categories
 * @param dataType - The SQL data type to categorize
 * @returns The category of the numeric type ('integer', 'decimal', 'floating') or null if not numeric
 */
export const getNumericTypeCategory = (dataType: string): 'integer' | 'decimal' | 'floating' | null => {
  const type = dataType.toLowerCase();
  if (['smallint', 'integer', 'bigint'].includes(type)) {
    return 'integer';
  }
  if (['decimal', 'numeric'].includes(type)) {
    return 'decimal';
  }
  if (['real', 'double precision'].includes(type)) {
    return 'floating';
  }
  return null;
};

/**
 * Checks if a primary key exists in the attribute list
 * @param {Attribute[]} attributes - List of attributes to check
 * @param {number | null} editingIndex - Index of attribute being edited (to exclude from check)
 * @returns {boolean} Whether a primary key exists
 */
export const isPrimaryKeyExists = (attributes: Attribute[], editingIndex: number | null): boolean => {
  return attributes.some((attr, idx) => {
    if (editingIndex !== null && idx === editingIndex) return false;
    return attr.constraints.includes('primary key');
  });
};

/**
 * Checks if any attribute in the list has a PRIMARY KEY constraint
 * @param attrs - List of table attributes to check
 * @returns boolean indicating whether a primary key exists
 */
export const hasPrimaryKey = (attrs: Attribute[]): boolean => {
  return attrs.some(attr => 
    Array.isArray(attr.constraints) && 
    attr.constraints.includes('PRIMARY KEY')
  );
}; 