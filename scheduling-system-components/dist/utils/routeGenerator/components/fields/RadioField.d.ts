/**
 * Radio Field Generator
 * Generates HTML/JSX for radio button form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates a radio button group component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default selected value
 * @returns {string} Generated radio button group JSX
 */
export declare function generateRadioField(attr: Attribute, fieldName: string, defaultValue: string): string;
