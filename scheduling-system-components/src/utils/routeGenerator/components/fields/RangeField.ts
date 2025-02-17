import { Attribute } from '../../../../interfaces/types';

export function generateRangeField(attr: Attribute, fieldName: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          {...register("${fieldName}")}
          min="${attr.min || 0}"
          max="${attr.max || 100}"
          step="${attr.step || 1}"
          className="w-full cursor-pointer appearance-none rounded-lg bg-stroke outline-none dark:bg-form-strokedark [&::-webkit-slider-thumb]:h-[14px] [&::-webkit-slider-thumb]:w-[14px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
        <span className="min-w-[45px] rounded-md border border-stroke px-2 py-1 text-sm font-medium text-black dark:border-form-strokedark dark:text-white">
          {watch("${fieldName}")}
        </span>
      </div>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 