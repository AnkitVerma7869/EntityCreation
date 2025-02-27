import { Attribute } from '../../../../interfaces/types';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export function generateSelectField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isMultiple = attr.config?.multiple || false;
  const defaultVal = defaultValue ? 
    (isMultiple ? defaultValue.split(',').map(v => ({ value: v.trim(), label: v.trim() })) 
                : { value: defaultValue, label: defaultValue })
    : null;
  
  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <Controller
        name="${fieldName}"
        control={control}
        defaultValue={${JSON.stringify(defaultVal)}}
        render={({ field: { onChange, value, ...field } }) => (
          <Select
            {...field}
            value={${isMultiple} 
              ? (Array.isArray(value) ? value.map(v => ({ value: v, label: v })) : [])
              : value ? { value, label: value } : null
            }
            onChange={(option) => {
              ${isMultiple}
                ? onChange(option ? option.map((item) => item.value) : [])
                : onChange(option ? option.value : null)
            }}
            isMulti={${isMultiple}}
            options={[
              ${(attr.options || []).map(opt => `
                { value: "${opt.value}", label: "${opt.label || opt.value}" }
              `).join(',')}
            ]}
            className="react-select"
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