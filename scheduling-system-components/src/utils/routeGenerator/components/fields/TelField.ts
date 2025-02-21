import { Attribute } from '../../../../interfaces/types';

export function generateTelField(attr: Attribute, fieldName: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <PhoneNumberInput
        name="${fieldName}"
        control={control}
        onValueChange={(value) => {
          // Update the form value with phone and country code
          setValue('${fieldName}', value.phone);
          setValue('countryCode_${fieldName}', value.countryCode);
        }}
        disabled={${attr.config?.disabled || false}}
      />
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
}

// Add this to the imports section of the form page
export const telFieldImports = `
import PhoneNumberInput from '@/components/PhoneNumberInput';
`; 