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
          // Extract only the numbers from the phone string
          const phoneDigits = value.phone.replace(/\D/g, '');
          const countryCodeDigits = value.countryCode.replace(/\D/g, '');
          
          // Remove country code if it exists at the start of the phone number
          let finalPhone = phoneDigits;
          if (phoneDigits.startsWith(countryCodeDigits)) {
            finalPhone = phoneDigits.slice(countryCodeDigits.length);
          }
          
          setValue('${fieldName}', finalPhone);
          setValue('countryCode_${fieldName}', countryCodeDigits);
        }}
        disabled={${attr.config?.disabled || false}}
      />
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
      {errors['countryCode_${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['countryCode_${fieldName}']?.message}</p>
      )}
    </div>
  `;
}

// Add this to the imports section of the form page
export const telFieldImports = `
import PhoneNumberInput from '@/components/PhoneNumberInput';
`; 