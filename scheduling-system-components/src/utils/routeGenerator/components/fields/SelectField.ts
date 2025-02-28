/**
 * Select Field Generator
 * Generates HTML/JSX for select/dropdown form fields using react-select
 */

import { Attribute } from '../../../../interfaces/types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

/**
 * Generates a select/dropdown field component
 * @param {Attribute} attr - Field attribute configuration
 * @param {string} fieldName - Name of the form field
 * @param {string} defaultValue - Default selected value(s)
 * @returns {string} Generated select field JSX
 */
export function generateSelectField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.isReadOnly || !attr.isEditable;
  
  // Handle options based on their type
  const optionsArray = attr.options || [];
  const optionsString = optionsArray
    .map(opt => {
      const option = typeof opt === 'object' ? opt : { value: opt, label: opt };
      return `{ value: "${option.value}", label: "${option.label || option.value}" }`;
    })
    .join(',\n              ');
  
  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <Controller
        name="${fieldName}"
        control={control}
        defaultValue={undefined}
        render={({ field: { onChange, value, ...field } }) => (
          <Select
            {...field}
            value={value ? { value, label: value } : null}
            onChange={(option) => onChange(option?.value)}
            isMulti={${attr.isMultiSelect || false}}
            isDisabled={${isDisabled}}
            options={[
              ${optionsString}
            ]}
            className={\`react-select \${${isDisabled} ? 'cursor-not-allowed opacity-70' : ''}\`}
            classNamePrefix="select"
            placeholder="Select ${attr.name}"
            isClearable
          />
        )}
      />
       {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
}

export const selectFieldImports = `
import Select from 'react-select';
`; 