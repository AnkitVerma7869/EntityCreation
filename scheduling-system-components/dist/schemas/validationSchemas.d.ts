/**
 * Validation Schemas Module
 * Defines Yup validation schemas for entity and attribute validation
 */
import * as yup from "yup";
/**
 * Schema for validating entity names
 * Rules:
 * - Required
 * - No spaces allowed
 * - Must start with letter or underscore
 * - Must contain at least 2 letters
 * - Length between 2-50 characters
 */
export declare const entityNameSchema: yup.StringSchema<string, yup.AnyObject, undefined, "">;
/**
 * Schema for validating attribute names
 * Similar rules to entity name but specific to column attributes
 */
export declare const attributeNameSchema: yup.StringSchema<string, yup.AnyObject, undefined, "">;
/**
 * Schema for validating data types
 * Ensures selected type exists in dataTypeProperties
 */
export declare const dataTypeSchema: yup.StringSchema<string, yup.AnyObject, undefined, "">;
export declare const sizeSchema: yup.NumberSchema<number | null | undefined, yup.AnyObject, undefined, "">;
export declare const precisionSchema: yup.NumberSchema<number | null | undefined, yup.AnyObject, undefined, "">;
export declare const enumValuesSchema: yup.ArraySchema<any[] | undefined, yup.AnyObject, undefined, "">;
