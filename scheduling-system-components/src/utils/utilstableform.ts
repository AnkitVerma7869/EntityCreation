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
  validations: { required: false },
  inputType: ''
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

interface ApiSuccessResponse {
  success: {
    code: number;
    type: string;
    message: string;
    data: {
      create: { method: string; url: string };
      list: { method: string; url: string };
      get: { method: string; url: string };
      update: { method: string; url: string };
      delete: { method: string; url: string };
    };
  };
}

interface ApiErrorResponse {
  error: {
    code: number;
    type: string;
    message: string;
    data: null;
  };
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

/**
 * Saves entity to backend API and generates corresponding routes
 * @param entity - The entity configuration to save
 * @returns Promise<{message: string, success: boolean}> from the API
 */
export async function saveEntity(entity: Entity): Promise<{message: string, success: boolean}> {
  // Transform entity data to match API requirements
  const transformedEntity = {
    entityName: entity.entityName,
    attributes: entity.attributes.map(attr => ({
      attributeName: attr.name,
      inputType: attr.inputType,
      dataType: attr.dataType.toLowerCase(),
      size: attr.size,
      precision: attr.precision,
      constraints: attr.constraints,
      defaultValue: attr.defaultValue || "",
      options: attr.options,
      isMultiSelect: attr.isMultiSelect,
      isEditable: attr.isEditable,
      sortable: attr.sortable,
      enumValues: attr.dataType.toLowerCase() === 'enum' ? 
        attr.options?.map(opt => typeof opt === 'string' ? opt : opt.value) : 
        undefined,
      validations: {
        ...attr.validations,
        required: attr.validations.required || 
                 attr.constraints?.includes('not null') || 
                 attr.constraints?.includes('primary key') || 
                 false
      }
    }))
  };

  console.log('Saving Entity:', transformedEntity);
 

  // Send POST request to API
   const response = await fetch(`${API_URL}/api/v1/entity/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(transformedEntity),
  });

  console.log('Response:', response);
  
  const responseData: ApiResponse = await response.json();

  // Check if response contains error
 
  
  try {
    const config = {
      entityName: entity.entityName,
      attributes: entity.attributes
    };
    await generateTableRoutes(config);

  if ('error' in responseData) {
    throw new Error(responseData.error.message);
  }
    
    console.log('Routes generated successfully for:', entity.entityName);
  } catch (error) {
    console.error('Error generating routes:', error);
    throw new Error('Entity saved but failed to generate routes');
  }

  return {
    message: responseData.success.message,
    success: true
  };
 } 


