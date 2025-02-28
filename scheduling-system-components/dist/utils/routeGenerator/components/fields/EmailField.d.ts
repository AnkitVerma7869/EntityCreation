/**
 * Email Field Generator
 * Generates HTML/JSX for email input form fields
 */
import { Attribute } from '../../../../interfaces/types';
/**
 * Generates an email input field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default email value
 * @returns {string} Generated email field JSX
 */
export declare function generateEmailField(attr: Attribute, fieldName: string, defaultValue: string): string;
