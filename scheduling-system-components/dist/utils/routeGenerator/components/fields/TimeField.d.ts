/**
 * Time Field Generator
 * Generates HTML/JSX for time picker form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a time picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default time value (HH:mm format)
 * @returns {string} Generated time picker field JSX
 */
export declare function generateTimeField(attr: Attribute, fieldName: string, defaultValue: string): string;
