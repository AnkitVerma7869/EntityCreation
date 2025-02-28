/**
 * DateTime Field Generator
 * Generates HTML/JSX for datetime picker form fields
 */

import { Attribute } from '../../../../interfaces/types';

/**
 * Generates a datetime picker field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default datetime value (ISO format)
 * @returns {string} Generated datetime picker field JSX
 */
export function generateDateTimeField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary cursor-pointer ${attr.config?.className || ''}`;

  // Format current datetime to YYYY-MM-DDTHH:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Use provided default value or current datetime
  const defaultDateTime = getCurrentDateTime();
  
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div 
        className="relative cursor-pointer"
        onClick={() => {
          if (!${isDisabled}) {
            const input = document.querySelector('#${fieldName}') as HTMLInputElement;
            if (input) input.showPicker();
          }
        }}
      >
        <input
          id="${fieldName}"
          type="datetime-local"
          {...register("${fieldName}")}
          defaultValue="${defaultDateTime}"
          className="${className}"
          ${isDisabled ? 'disabled' : ''}
          ${attr.validations?.min ? `min="${attr.validations.min}"` : ''}
          ${attr.validations?.max ? `max="${attr.validations.max}"` : ''}
          onChange={(e) => {
            if (e.target.value) {
              e.target.blur();
            }
          }}
        />
      </div>
       {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 