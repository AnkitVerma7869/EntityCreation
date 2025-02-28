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
export function generateRichTextField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${attr.config?.className || ''}`;

  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <textarea
        {...register("${fieldName}")}
        defaultValue="${defaultValue || ''}"
        className="${className}"
        rows="6"
        placeholder="${attr.config?.placeholder || `Type your ${attr.name.toLowerCase()}`}"
        ${isDisabled ? 'disabled' : ''}
      ></textarea>
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 