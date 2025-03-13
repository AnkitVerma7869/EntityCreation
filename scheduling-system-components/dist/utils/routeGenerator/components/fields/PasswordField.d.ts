/**
 * Password Field Generator
 * Generates HTML/JSX for password input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a password input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default password value (usually empty)
 * @returns {string} Generated password field JSX
 */
export declare function generatePasswordField(attr: Attribute, fieldName: string, defaultValue: string): string;
