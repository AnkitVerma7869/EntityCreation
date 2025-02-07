import { Attribute } from "../interfaces/types";
import { dataTypeProperties } from "../constants/dataTypeProperties";

/**
 * Checks if a given SQL data type requires size validation
 * @param dataType - The SQL data type to check (e.g., varchar, char)
 * @returns boolean indicating whether the type needs size validation
 */
export const needsSizeValidation = (dataType: string): boolean => {
  const type = dataType.toLowerCase();
  return dataTypeProperties[type]?.needsSize ?? false;
};

/**
 * Checks if a given SQL data type requires precision specification
 * @param dataType - The SQL data type to check (e.g., decimal, numeric)
 * @returns boolean indicating whether the type needs precision
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
 * Checks if a primary key already exists in the attributes list, excluding the currently editing attribute
 * @param attributes - List of table attributes
 * @param editingIndex - Index of the attribute currently being edited (if any)
 * @returns boolean indicating whether a primary key exists in other attributes
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