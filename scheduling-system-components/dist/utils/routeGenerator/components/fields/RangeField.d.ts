/**
 * Range Field Generator
 * Generates HTML/JSX for range slider form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a range slider component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default slider value
 * @returns {string} Generated range slider JSX
 */
export declare function generateRangeField(attr: Attribute, fieldName: string, defaultValue: string): string;
