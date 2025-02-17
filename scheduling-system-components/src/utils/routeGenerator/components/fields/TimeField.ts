import { Attribute } from '../../../../interfaces/types';

export function generateTimeField(attr: Attribute, fieldName: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <input
        type="time"
        {...register("${fieldName}")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        ${attr.config?.min ? `min="${attr.config.min}"` : ''}
        ${attr.config?.max ? `max="${attr.config.max}"` : ''}
        ${attr.config?.step ? `step="${attr.config.step}"` : ''}
      />
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 