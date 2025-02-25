import { Attribute } from '../../../../interfaces/types';

export function generateDateTimeField(attr: Attribute, fieldName: string, defaultValue: string) {
  // Format current datetime to YYYY-MM-DDTHH:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Use provided default value or current datetime
  const defaultDateTime = getCurrentDateTime();
  
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div 
        className="relative cursor-pointer"
        onClick={() => {
          const input = document.querySelector('#${fieldName}') as HTMLInputElement;
          if (input) input.showPicker();
        }}
      >
        <input
          id="${fieldName}"
          type="datetime-local"
          {...register("${fieldName}")}
          defaultValue="${defaultDateTime}"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary cursor-pointer"
          ${attr.validations?.min ? `min="${attr.validations.min}"` : ''}
          ${attr.validations?.max ? `max="${attr.validations.max}"` : ''}
          onChange={(e) => {
            if (e.target.value) {
              e.target.blur();
            }
          }}
        />
      </div>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 