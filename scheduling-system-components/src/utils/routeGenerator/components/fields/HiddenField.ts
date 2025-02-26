import { Attribute } from '../../../../interfaces/types';

export function generateHiddenField(attr: Attribute, fieldName: string, defaultValue: string) {
  return `
    <input
      type="hidden"
      {...register("${fieldName}")}
      defaultValue="${defaultValue || ''}"
    />
  `;
} 