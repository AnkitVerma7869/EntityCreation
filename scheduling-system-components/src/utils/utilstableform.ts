import { Attribute, ConfigData, Entity } from '../interfaces/types';
import { generateTableRoutes } from './routeGenerator';

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
  inputType: 'text',
  isReadOnly: false,
  displayInList: true,
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
    attributes: entity.attributes.map(attr => {
      // Convert gender input type to radio
      const inputType = attr.inputType === 'gender' ? 'radio' : attr.inputType;
      const isRadioType = inputType === 'radio';
      
      return {
        attributeName: attr.name,
        inputType: inputType,
        dataType: attr.dataType.toLowerCase(),
        size: attr.size,
        precision: attr.precision,
        constraints: attr.constraints,
        defaultValue: attr.defaultValue || "",
        options: attr.inputType === 'gender' ? [
          { value: "male", label: "male" },
          { value: "female", label: "female" },
          { value: "others", label: "others" }
        ] : attr.options,
        isMultiSelect: isRadioType ? false : attr.isMultiSelect, // Radio buttons are never multi-select
        isEditable: attr.isEditable !== undefined ? attr.isEditable : true,
        sortable: attr.sortable !== undefined ? attr.sortable : true,
        enumValues: attr.dataType.toLowerCase() === 'enum' ? 
          (attr.inputType === 'gender' ? ['male', 'female', 'others'] : 
            attr.options?.map(opt => typeof opt === 'string' ? opt : opt.value)) : 
          undefined,
        validations: {
          ...attr.validations,
          required: attr.validations.required || 
                   attr.constraints?.includes('not null') || 
                   attr.constraints?.includes('primary key') || 
                   false
        },
        isReadOnly: attr.isReadOnly || false,
        displayInList: attr.displayInList !== false,
      };
    })
  };

  console.log('Saving Entity:', transformedEntity);
 
  const response = await fetch(`${API_URL}/api/v1/entity/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(transformedEntity),
  });

  
  const responseData: ApiResponse = await response.json();

  // Check if response contains error
  if ('error' in responseData) {
    throw new Error(responseData.error.message);
  }
 
  try {
    const config = {
      entityName: entity.entityName,
      attributes: entity.attributes
    };
    await generateTableRoutes(config);
    
    console.log('Routes generated successfully for:', entity.entityName);
  } catch (error) {
    console.error('Error generating routes:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }

  return {
   message: responseData.success.message,
   success: true
  };
} 


