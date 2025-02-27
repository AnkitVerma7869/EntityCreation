import { Attribute } from '../../../../interfaces/types';

export function generateHiddenField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;

  return `
    <input
      type="hidden"
      {...register("${fieldName}")}
      defaultValue="${defaultValue || ''}"
      ${isDisabled ? 'disabled' : ''}
    />
  `;
} 