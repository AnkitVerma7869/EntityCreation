/**
 * DateTime Field Generator
 * Generates HTML/JSX for datetime picker form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a datetime picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default datetime value (ISO format)
 * @returns {string} Generated datetime picker field JSX
 */
export declare function generateDateTimeField(attr: Attribute, fieldName: string, defaultValue: string): string;
