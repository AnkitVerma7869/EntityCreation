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
export function generateTelField(attr: Attribute, fieldName: string, defaultValue: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <PhoneNumberInput
        name="${fieldName}"
        control={control}
        onValueChange={(value) => {
          // Simple concatenation with + prefix
          const phoneWithCode = \`+\${value.countryCode}\${value.phone}\`;
          setValue('${fieldName}', phoneWithCode);
        }}
        disabled={${attr.config?.disabled || false}}
      />
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
}

// Add this to the imports section of the form page
export const telFieldImports = `
import PhoneNumberInput from '@/components/PhoneNumberInput';
`; 