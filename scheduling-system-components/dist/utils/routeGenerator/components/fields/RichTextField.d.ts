/**
 * Rich Text Field Generator
 * Generates HTML/JSX for rich text editor form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a rich text editor component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default text content
 * @returns {string} Generated rich text editor JSX
 */
export declare function generateRichTextField(attr: Attribute, fieldName: string, defaultValue: string): string;
