import { Attribute } from '../../../../interfaces/types';

export function generateSelectField(attr: Attribute, fieldName: string) {
  const isMultiple = attr.config?.multiple || false;
  
  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <select
        {...register("${fieldName}")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        multiple={${isMultiple}}
      >
        <option value="">Select ${attr.name}</option>
        ${(attr.options || []).map(opt => `
          <option value="${opt.value}">${opt.label}</option>
        `).join('')}
      </select>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 