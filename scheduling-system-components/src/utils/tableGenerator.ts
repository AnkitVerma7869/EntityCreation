
//This is dummy code for now and needs to be tested 


import { TableConfig } from '../types';

/**
 * Saves the table configuration through API
 */
export async function saveTableConfig(config: TableConfig) {
  try {
    const response = await fetch('/api/tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving table:', error);
    return { success: false };
  }
}

/**
 * Gets all table configurations
 */
export async function getAllTables() {
  try {
    const response = await fetch('/api/tables');
    const data = await response.json();
    return { success: true, data: data.tables };
  } catch (error) {
    return { success: false, message: 'Failed to get tables', error };
  }
}

/**
 * Gets a specific table configuration by name
 */
export async function getTableByName(tableName: string) {
  try {
    const response = await fetch(`/api/tables/${tableName}`);
    return await response.json();
  } catch (error) {
    return { success: false, message: `Failed to get table ${tableName}` };
  }
}

/**
 * Deletes a table configuration
 */
export async function deleteTable(tableName: string) {
  try {
    const response = await fetch(`/api/tables/${tableName}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: `Failed to delete table ${tableName}` };
  }
} 