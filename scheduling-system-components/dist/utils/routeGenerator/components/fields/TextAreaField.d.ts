/**
 * Text Area Field Generator
 * Generates HTML/JSX for multiline text input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a text area input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default text content
 * @returns {string} Generated text area field JSX
 */
export declare function generateTextAreaField(attr: Attribute, fieldName: string, defaultValue: string): string;
