import { Attribute } from '../../../../interfaces/types';

export function generateCheckboxField(attr: Attribute, fieldName: string) {
  return `
    <div>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="flex flex-wrap gap-6">
        ${(attr.options || []).map(option => `
          <label className="flex items-center min-w-[120px] text-sm font-medium text-black dark:text-white">
            <input
              type="checkbox"
              {...register("${fieldName}", {
                setValueAs: (value) => {
                  const checkboxes = document.querySelectorAll('input[name="${fieldName}"]:checked');
                  return Array.from(checkboxes).map(cb => (cb as HTMLInputElement).value);
                }
              })}
              value="${option.value}"
              defaultChecked={false}
              className="mr-3 h-5 w-5 cursor-pointer rounded border-[1.5px] border-stroke bg-transparent outline-none focus:border-primary checked:border-primary checked:bg-primary dark:border-form-strokedark dark:bg-form-input"
            />
            ${option.label}
          </label>
        `).join('')}
      </div>
      {errors.${fieldName} && (
        <p className="mt-1 text-sm text-meta-1">{errors.${fieldName}?.message}</p>
      )}
    </div>
  `;
} 