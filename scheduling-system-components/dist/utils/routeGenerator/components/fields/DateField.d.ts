/**
 * Date Field Generator
 * Generates HTML/JSX for date picker form fields using DatePickerOneRequired component
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a date picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default date value (ISO format)
 * @returns {string} Generated date picker field JSX
 */
export declare function generateDateField(attr: Attribute, fieldName: string, defaultValue: string): string;
