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
export function generateRadioField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `mr-3 h-5 w-5 cursor-pointer border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="flex flex-wrap gap-6">
        ${(attr.options || []).map(option => `
          <label className="flex items-center min-w-[120px] text-sm font-medium text-black dark:text-white">
            <input
              type="radio"
              {...register("${fieldName}")}
              value="${option.value}"
              defaultChecked={${defaultValue === option.value ? 'true' : 'false'}}
              className="${className}"
              ${isDisabled ? 'disabled' : ''}
            />
            ${option.label}
          </label>
        `).join('')}
      </div>
       {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 