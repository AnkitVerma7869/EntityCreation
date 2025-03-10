/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */

import { Attribute, ConfigData, Entity } from '../interfaces/types';
import { generateTableRoutes } from './routeGenerator';
import Cookies from 'js-cookie';
import { post } from '@/utils/apiCalls';

// API endpoint from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

/**
 * Converts an array to a comma-separated string
 * Used for displaying array values in table cells
 * 
 * @param {string[] | undefined} arr - Array to format
 * @returns {string} Comma-separated string
 */
export const formatArrayToString = (arr: string[] | undefined): string => {
  return arr ? arr.join(', ') : '';
};

/**
 * Default configuration for a new attribute
 * Provides sensible defaults for all attribute properties
 */
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
  references: undefined
};

/**
 * Fetches entity configuration from JSON file
 * Contains input types, data types, and other configuration options
 * 
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
export async function fetchEntityConfig(): Promise<ConfigData> {
  const response = await fetch('/data/entityConfig.json');
  if (!response.ok) {
    throw new Error('Failed to fetch config');
  }
  const data = await response.json();
  return data;
}

/**
 * API success response structure
 */
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

/**
 * API error response structure
 */
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
 * Updates the sidebar routes through the API
 * @param entityName - Name of the entity to add to routes
 */
async function updateSidebarRoutes(entityName: string) {
  try {
    const response = await fetch('/api/sidebar-routes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entityName }),
    });

    if (!response.ok) {
      throw new Error('Failed to update sidebar routes');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to update sidebar routes');
    }
  } catch (error) {
    console.error('Error updating sidebar routes:', error);
    throw new Error('Failed to update sidebar routes');
  }
}
/**
 * Saves entity configuration to backend API and generates corresponding routes
 * 
 * Features:
 * - Transforms entity data to match API requirements
 * - Handles special input types (e.g., gender)
 * - Sets up validations and constraints
 * - Generates frontend routes
 * - Provides error handling
 * 
 * 
 * @param {Entity} entity - Entity configuration to save
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call or route generation fails
 */
export async function saveEntity(entity: Entity): Promise<{message: string, success: boolean}> {
  // Get the access token from cookies
  const token = Cookies.get('accessToken');
  if (!token) {
    throw new Error('Authentication required');
  }

  try {
    // Fetch configuration data
    const configData = await fetchEntityConfig();
    
    // Transform entity data for API
    const transformedEntity = {
      entityName: entity.entityName,
      attributes: entity.attributes.map(attr => {
        // Get input type configuration
        const inputTypeConfig = configData?.inputTypes[attr.inputType];
        
        // Handle special input types
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
          isMultiSelect: isRadioType ? false : attr.isMultiSelect,
          isEditable: attr.isEditable !== undefined ? attr.isEditable : true,
          sortable: attr.sortable !== undefined ? attr.sortable : true,
          enumType: attr.inputType.endsWith('_enum') ? attr.inputType : undefined,
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
          references: attr.references
        };
      })
    };

    // Log transformed entity for debugging
    console.log('Saving Entity:', transformedEntity);
   
    // Use post utility function from apiCalls
    const response = await post(
      '/api/v1/entity/create',
      token,
      transformedEntity,
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );

    // Handle API errors
    if ('error' in response) {
      throw new Error(typeof response.error === 'string' ? response.error : JSON.stringify(response.error));
    }
   
    // Generate frontend routes
    try {
      const config = {
        entityName: entity.entityName,
        attributes: entity.attributes
      };
      await generateTableRoutes(config);
      await updateSidebarRoutes(entity.entityName);
      console.log('Routes generated successfully for:', entity.entityName);
    } catch (error) {
      console.error('Error generating routes:', error);
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }

    return {
      message: response.success.message,
      success: true
    };
  } catch (error: any) {
    // Handle specific error types
    let errorMessage = 'Failed to save entity';
    
    try {
      const parsedError = JSON.parse(error.message);
      errorMessage = parsedError.message || parsedError.error || errorMessage;
    } catch {
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
} 


