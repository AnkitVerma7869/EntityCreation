import { Attribute } from '../../../../interfaces/types';

export function generateHiddenField(attr: Attribute, fieldName: string) {
  return `
    <input
      type="hidden"
      {...register("${fieldName}")}
      value="${attr.defaultValue || ''}"
    />
  `;
} 