import { Attribute } from '../../../../interfaces/types';

export function generateDateField(attr: Attribute, fieldName: string, defaultValue: string) {
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