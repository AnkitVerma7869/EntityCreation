/**
 * Color Field Generator
 * Generates HTML/JSX for color picker form fields
 */

import { Attribute } from '../../../../interfaces/types';

/**
 * Generates a color picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default color value (hex format)
 * @returns {string} Generated color picker field JSX
 */
export function generateColorField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `h-10 w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <input
        type="color"
        {...register("${fieldName}")}
        defaultValue="${defaultValue || '#000000'}"
        className="${className}"
        ${isDisabled ? 'disabled' : ''}
      />
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 