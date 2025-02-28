import { Entity } from '../../interfaces/types';
import { generatePages } from './pages';
import { generateEntityStore } from './utils/storeGenerator';

/**
 * Generates and saves all necessary routes for a table
 * @param config - Configuration for the table including name and attributes
 * @returns Promise resolving to the API response
 */
export async function generateTableRoutes(config: Entity) {
  try {
    // Generate all route contents
    const routes = {
      pages: generatePages(config),
      store: {
        [`${config.entityName.toLowerCase()}Store.ts`]: generateEntityStore(config)
      }
    };


    // Send routes to the API for file creation
    const response = await fetch('/api/generate-routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entityName: config.entityName,
        attributes: config.attributes,
        routes
      }),
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to generate routes');
    }
    return result;
  } catch (error: any) {
    console.error('Error generating routes:', error);
    throw error;
  }
} 