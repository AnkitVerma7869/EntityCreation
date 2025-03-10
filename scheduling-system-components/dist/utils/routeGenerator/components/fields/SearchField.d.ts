/**
 * Search Field Generator
 * Generates HTML/JSX for search input form fields with search icon
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a search input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default search value
 * @returns {string} Generated search field JSX with icon
 */
export declare function generateSearchField(attr: Attribute, fieldName: string, defaultValue: string): string;
