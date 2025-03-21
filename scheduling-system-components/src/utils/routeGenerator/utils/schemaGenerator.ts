import { Entity } from '../../../interfaces/types';
import { getFormValidationSchema } from '../schemas/entityValidationSchema';

export function generateSchemaFile(config: Entity): string {
  return `
    import * as yup from 'yup';    
    export const validationSchema = ${getFormValidationSchema(config).toString()};
  `;
} 