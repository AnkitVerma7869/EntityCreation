/**
 * Form Generator Module
 * Generates React form components based on entity attributes
 */
import { Attribute } from '../../../interfaces/types';
/**
 * Generates form fields and required imports for an entity
 * @param {Attribute[]} attributes - List of entity attributes
 * @returns {{ imports: string, fields: string }} Generated imports and field components
 */
export declare function generateFormFields(attributes: Attribute[]): {
    imports: string;
    fields: string;
};
