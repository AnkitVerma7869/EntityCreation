/**
 * Select Field Generator
 * Generates HTML/JSX for select/dropdown form fields using react-select
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a select/dropdown field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default selected value(s)
 * @returns {string} Generated select field JSX
 */
export declare function generateSelectField(attr: Attribute, fieldName: string, defaultValue: string): string;
export declare const selectFieldImports = "\nimport Select from 'react-select';\n";
