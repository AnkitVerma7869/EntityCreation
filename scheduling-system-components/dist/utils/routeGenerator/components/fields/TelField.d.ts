/**
 * Telephone Field Generator
 * Generates HTML/JSX for telephone input form fields with phone number formatting
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a telephone input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default phone number
 * @returns {string} Generated telephone field JSX
 */
export declare function generateTelField(attr: Attribute, fieldName: string, defaultValue: string): string;
export declare const telFieldImports = "\nimport PhoneNumberInput from '@/components/PhoneNumberInput';\n";
