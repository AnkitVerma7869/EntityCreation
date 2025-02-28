/**
 * URL Field Generator
 * Generates HTML/JSX for URL input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a URL input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default URL value
 * @returns {string} Generated URL field JSX
 */
export declare function generateUrlField(attr: Attribute, fieldName: string, defaultValue: string): string;
