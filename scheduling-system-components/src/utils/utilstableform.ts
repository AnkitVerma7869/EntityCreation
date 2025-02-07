import { Attribute, ConfigData, Entity } from '../interfaces/types';
import { generateTableRoutes } from '../utils/routeGenerator';

// API endpoint from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

// Helper function to convert array to comma-separated string
export const formatArrayToString = (arr: string[] | undefined): string => {
  return arr ? arr.join(', ') : '';
};

// Initial state for a new attribute
export const initialAttributeState: Attribute = {
  name: "",
  dataType: "",
  size: null,
  precision: null,
  constraints: [],
  defaultValue: null,
  validations: { required: false }
};

// Fetch entity configuration from JSON file
export async function fetchEntityConfig(): Promise<ConfigData> {
  const response = await fetch('/data/entityConfig.json');
  if (!response.ok) {
    throw new Error('Failed to fetch config');
  }
  const data = await response.json();
  return data;
}

/**
 * Saves entity to backend API and generates corresponding routes
 * @param entity - The entity configuration to save
 * @returns Promise<Response> from the API
 */
export async function saveEntity(entity: Entity): Promise<Response> {
  // Transform entity data to match API requirements
  const transformedEntity = {
    entityName: entity.entityName,
    attributes: entity.attributes.map(attr => ({
      attributeName: attr.name,
      dataType: attr.dataType.toLowerCase(),
      size: attr.size,
      precision: attr.precision,
      constraints: attr.constraints,
      defaultValue: attr.defaultValue || "",
      validations: {
        required: attr.validations.required || 
                 attr.constraints?.includes('not null') || 
                 attr.constraints?.includes('primary key') || 
                 false
      }
    }))
  };

  console.log('Saving Entity:', transformedEntity);
  
  // Send POST request to API
  const response = await fetch(`${API_URL}/api/entity/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(transformedEntity),
  });

  console.log('Response:', response);
  // Handle API response
  // if (!response.ok) {
  //   throw new Error(`Failed to save entity: ${response.status} ${response.statusText}`);
  // }

  // Generate routes after successful entity creation
  try {
    const config = {
      entityName: entity.entityName,
      attributes: entity.attributes
    };
    
    await generateTableRoutes(config);
    console.log('Routes generated successfully for:', entity.entityName);
  } catch (error) {
    console.error('Error generating routes:', error);
    throw new Error('Entity saved but failed to generate routes');
  }

  return response;
} 



