import { Attribute } from '../../../../interfaces/types';

export function generateCheckboxField(attr: Attribute, fieldName: string) {
  return `
    <div>
      <label className="mb-1 flex items-center text-sm font-medium text-black dark:text-white">
        <input
          type="checkbox"
          {...register("${fieldName}")}
          className="mr-3 h-5 w-5 cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input"
        />
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 