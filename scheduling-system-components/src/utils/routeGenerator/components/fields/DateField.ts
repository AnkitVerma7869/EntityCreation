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
export function generateDateField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  // Use current date if no default value is provided
  const defaultDate = defaultValue || new Date().toISOString().split('T')[0];
  
  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <DatePickerOneRequired
        defaultValue={new Date("${defaultDate}")}
        onChange={(selectedDates) => setValue("${fieldName}", selectedDates[0])}
        required={${attr.validations?.required ? 'true' : 'false'}}
        minDate={${attr.validations?.min ? `new Date("${attr.validations.min}")` : 'undefined'}}
        maxDate={${attr.validations?.max ? `new Date("${attr.validations.max}")` : 'undefined'}}
        labelClasses="hidden"
      />
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 