import { Attribute } from '../../../../interfaces/types';

export function generateTimeField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary cursor-pointer ${attr.config?.className || ''}`;

  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div 
        className="relative cursor-pointer"
        onClick={() => {
          if (!${isDisabled}) {
            const input = document.querySelector('#${fieldName}') as HTMLInputElement;
            if (input) input.showPicker();
          }
        }}
      >  
        <input
          id="${fieldName}"
          type="time"
          {...register("${fieldName}")}
          defaultValue="${defaultValue || ''}"
          className="${className}"
          ${attr.config?.min ? `min="${attr.config.min}"` : ''}
          ${attr.config?.max ? `max="${attr.config.max}"` : ''}
          ${attr.config?.step ? `step="${attr.config.step}"` : ''}
          ${isDisabled ? 'disabled' : ''}
          onChange={(e) => {
            if (e.target.value) {
              e.target.blur();
            }
          }}
        />
      </div>
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
    </div>
  `;
} 