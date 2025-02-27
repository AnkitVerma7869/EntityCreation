import { Attribute } from '../../../../interfaces/types';

export function generateFileField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent text-center file:mr-4 file:px-4 file:mt-0 file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 dark:file:bg-boxdark dark:file:text-white dark:text-white dark:hover:file:bg-boxdark-2 ${attr.config?.className || ''}`;

  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="relative">
        <input
          type="file"
          {...register("${fieldName}")}
          defaultValue="${defaultValue || ''}"
          className="${className}"
          accept="${attr.config?.acceptedFileTypes || '*'}"
          ${attr.config?.multiple ? 'multiple' : ''}
          ${isDisabled ? 'disabled' : ''}
        />
      </div>
       {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 