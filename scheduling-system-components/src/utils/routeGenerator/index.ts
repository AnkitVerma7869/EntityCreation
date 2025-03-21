import { Entity } from '../../interfaces/types';
import { generateCreatePage } from './pages/pageComponents/createPageComp';
import { generateEditPage } from './pages/pageComponents/editPageComp';
import { generateListPage } from './pages/pageComponents/listPageComp';
import { generateViewPage } from './pages/pageComponents/viewPageComp';
import { generateEntityStore } from './store/storeGenerator';
import { generateSchemaFile } from './utils/schemaGenerator';

/**
 * Generates and saves all necessary routes for a table
 * @param config - Configuration for the table including name and attributes
 * @returns Promise resolving to the API response
 */
export async function generateTableRoutes(config: Entity) {
  try {
    // Generate all route contents
    const routes = {
      pages: {
        list: generateListPage(config),
        create: generateCreatePage(config),
        edit: generateEditPage(config),
        view: generateViewPage(config)
      },
      store: {
        [`${config.entityName.toLowerCase()}Store.ts`]: generateEntityStore(config)
      },
      schemas: {
        [`${config.entityName.toLowerCase()}Schema.ts`]: generateSchemaFile(config)
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

export function generateRoutes(config: Entity) {
  return {
    pages: {
      list: generateListPage(config),
      create: generateCreatePage(config),
      edit: generateEditPage(config),
      view: generateViewPage(config)
    },
    store: {
      [`${config.entityName.toLowerCase()}Store.ts`]: generateEntityStore(config)
    },
    schemas: {
      [`${config.entityName.toLowerCase()}Schema.ts`]: generateSchemaFile(config)
    }
  };
} 