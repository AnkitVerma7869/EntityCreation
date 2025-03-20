/**
 * Table Form Utilities Module
 * Provides helper functions for handling entity configuration and API interactions
 */

import { Attribute, ConfigData, Entity } from '../interfaces/types';
import { generateTableRoutes } from './routeGenerator';

// API endpoint from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
const DATABASE_TYPE = process.env.NEXT_PUBLIC_DATABASE_TYPE;
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
  references: undefined,
  isIndexed: false,
  indexLength: null
};

let isRunning = false;
let isCheckingMigration = false;

/**
 * Fetches entity configuration from JSON file
 * Contains input types, data types, and other configuration options
 * 
 * @returns {Promise<ConfigData>} Entity configuration data
 * @throws {Error} If fetch fails
 */
export async function fetchEntityConfig(): Promise<ConfigData> {
  let response;

  if (DATABASE_TYPE === 'mongodb') {
    response = await fetch('/data/mongoEntityConfig.json');
  } else if (DATABASE_TYPE === 'postgresql') {
    response = await fetch('/data/entityConfig.json');
  } else {
    throw new Error('Unsupported database type');
  }

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

interface WebhookEntity {
  name?: string;
  table_name?: string;
  status?: boolean;
  migrations?: boolean;
}

// Track entities being processed
const processingEntities = new Set<string>();
const completedEntities = new Set<string>();

/**
 * Updates the sidebar routes through the API
 * @param entityName - Name of the entity to add to routes
 */
async function updateSidebarRoutes(entityName: string) {
  try {
    const response = await fetch('/api/sidebar-routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entityName }),
    });

    if (!response.ok) throw new Error('Failed to update sidebar routes');
    const data = await response.json();
    if (!data.success) throw new Error(data.error || 'Failed to update sidebar routes');
  } catch (error) {
    console.error('Error updating sidebar routes:', error);
    throw error;
  }
}

/**
 * Checks webhook and updates routes if needed
 */
async function checkWebhookAndUpdateRoutes() {
  // If already running or checking migration, skip
  if (isRunning || isCheckingMigration) return;
  
  isRunning = true;
  isCheckingMigration = true;

  try {
    const response = await fetch(`${API_URL}/api/v1/entity/check-migration-status`);
    if (!response.ok) throw new Error('Failed to call webhook');

    const result = await response.json();
    const entities: WebhookEntity[] = result.success.data;
    
    for (const entity of entities) {
      // Handle both response formats
      const entityName = entity.name || entity.table_name;
      const migrationStatus = entity.status || entity.migrations;
      
      if (!entityName) continue;       
      // Skip if already processing or completed
      if (processingEntities.has(entityName) || completedEntities.has(entityName)) {
        continue;
      }

      if (migrationStatus) {
        try {
          processingEntities.add(entityName);
          await updateSidebarRoutes(entityName);
          completedEntities.add(entityName);
          console.log(`Sidebar routes updated for: ${entityName}`);
        } catch (error) {
          console.error(`Error updating sidebar routes for ${entityName}:`, error);
        } finally {
          processingEntities.delete(entityName);
        }
      } else {
        console.log(`Migration still in progress for: ${entityName}`);
      }
    }
  } catch (error) {
    console.error('Error checking webhook:', error);
  } finally {
    isRunning = false;
    isCheckingMigration = false; // Reset the flag when done
  }
}

// Start polling when module loads
const pollInterval = setInterval(checkWebhookAndUpdateRoutes, 10000);

// Clear completed entities every hour
const cleanupInterval = setInterval(() => {
  completedEntities.clear();
}, 3600000);

// Export function to stop polling if needed
export function stopPolling() {
  clearInterval(pollInterval);
  clearInterval(cleanupInterval);
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
 * @param {Entity} entity - Entity configuration to save
 * @param {string} token - Authentication token
 * @returns {Promise<{message: string, success: boolean}>} API response
 * @throws {Error} If API call or route generation fails
 */
export async function saveEntity(entity: Entity, token: string): Promise<{message: string, success: boolean}> {
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
        // Add enumType to the transformed data
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
        references: attr.references,
        isIndexed: attr.isIndexed || false,
        indexLength: attr.indexLength || null
      };
    })
  };

  // Log transformed entity for debugging
  console.log('Saving Entity:', transformedEntity);
 
  // Send API request with token
  const response = await fetch(`${API_URL}/api/v1/entity/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transformedEntity),
  });

  const responseData: ApiResponse = await response.json();

  // Handle API errors
  if ('error' in responseData) {
    throw new Error(responseData.error.message);
  }
 
  // Generate frontend routes
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


