import * as yup from 'yup';
import { Entity } from '../../../interfaces/types';
import { generateValidationSchema } from '../utils/validationSchemaGenerator';

export function createEntityValidationSchema(config: Entity) {
  const schemaFields = generateValidationSchema(config.attributes);
  
  // Create and return the validation schema
  return yup.object().shape({
    [config.entityName]: yup.object().shape({
      ...eval(`({${schemaFields}})`)
    })
  });
}

// Helper function to get form validation schema
export function getFormValidationSchema(config: Entity) {
  const schemaFields = generateValidationSchema(config.attributes);
  return `yup.object().shape({
    ${schemaFields}
  })`;
} 