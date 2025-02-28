/**
 * Text Field Generator
 * Generates HTML/JSX for basic text input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a text input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default text value
 * @returns {string} Generated text field JSX
 */
export declare function generateTextField(attr: Attribute, fieldName: string, defaultValue: string): string;
