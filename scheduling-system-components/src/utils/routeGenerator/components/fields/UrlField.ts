import { Attribute } from '../../../../interfaces/types';

export function generateUrlField(attr: Attribute, fieldName: string, defaultValue: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="relative flex">
        <span className="inline-flex items-center px-3 text-sm border-[1.5px] border-r-0 border-stroke bg-gray-2 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white rounded-l">
          https://
        </span>
        <input
          type="url"
          {...register("${fieldName}")}
          defaultValue="${defaultValue || ''}"
          placeholder="${attr.config?.placeholder || 'example.com'}"
          className="w-full rounded-r border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 