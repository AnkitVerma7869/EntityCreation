/**
 * Checkbox Field Generator
 * Generates HTML/JSX for checkbox form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a checkbox field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default checked values (comma-separated)
 * @returns {string} Generated checkbox field JSX
 */
export declare function generateCheckboxField(attr: Attribute, fieldName: string, defaultValue: string): string;
