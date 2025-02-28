/**
 * Range Field Generator
 * Generates HTML/JSX for range slider form fields
 */

import { Attribute } from '../../../../interfaces/types';

/**
 * Generates a range slider component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default slider value
 * @returns {string} Generated range slider JSX
 */
export function generateRangeField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full cursor-pointer appearance-none rounded-lg bg-stroke outline-none dark:bg-form-strokedark [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          {...register("${fieldName}")}
          defaultValue="${defaultValue || attr.min || 0}"
          min="${attr.min || 0}"
          max="${attr.max || 100}"
          step="${attr.step || 1}"
          className="${className}"
          ${isDisabled ? 'disabled' : ''}
        />
        <span className="min-w-[45px] rounded-md border border-stroke px-2 py-1 text-sm font-medium text-black dark:border-form-strokedark dark:text-white">
          {watch("${fieldName}")}
        </span>
      </div>
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 