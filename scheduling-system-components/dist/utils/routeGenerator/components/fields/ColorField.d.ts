/**
 * Color Field Generator
 * Generates HTML/JSX for color picker form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a color picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default color value (hex format)
 * @returns {string} Generated color picker field JSX
 */
export declare function generateColorField(attr: Attribute, fieldName: string, defaultValue: string): string;
