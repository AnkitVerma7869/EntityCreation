/**
 * Store Generator Module
 * Generates Zustand store implementations for entity state management
 */

import { Entity, Attribute } from '../../../interfaces/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;

/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 * 
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name: string): string {
  return name
    // Replace hyphens and spaces with underscores first
    .replace(/[-\s]+/g, '_')
    // Split by underscores
    .split('_')
    // Capitalize first letter of each word
    .map((word, index) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      // For camelCase, make first word start with lowercase
      return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
    // Join without any separator
    .join('');
}

/**
 * Formats a field name for use in TypeScript interfaces and state
 * Handles special characters by wrapping in quotes if needed
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted field name safe for TypeScript
 */
function formatFieldName(name: string): string {
  return name.includes('-') ? `'${name}'` : name;
}

/**
 * Generates initial state value for a field based on its input type
 * 
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} Initial state value as string literal
 */
function generateFieldState(attr: Attribute): string {
  switch (attr.inputType.toLowerCase()) {
    case 'date':
      return 'null';
    case 'file':
      return '[]';
    case 'select':
    case 'multiselect':
      return attr.config?.multiple ? '[]' : '""';
    case 'number':
      return '0';
    default:
      return '""';
  }
}

/**
 * Generates a complete Zustand store implementation for an entity
 * 
 * Features:
 * - Type-safe state management
 * - CRUD operations with error handling
 * - Loading states and success/error messages
 * - Pagination and sorting
 * - Field change handlers for different input types
 * - Form reset functionality
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated store implementation
 */
export function generateEntityStore(config: Entity) {
  const formattedEntityName = formatEntityName(config.entityName);
  
  return `
    import { create } from 'zustand';
    import { devtools } from 'zustand/middleware';
    import Cookies from 'js-cookie';

    /**
     * Parameters for list operations
     */
    interface ListParams {
      page: number;          // Current page number
      limit: number;         // Items per page
      sortBy: string;        // Field to sort by
      orderBy: 'asc' | 'desc'; // Sort direction
      search: string;        // Search query
      searchFields: string[]; // Fields to search in
      returnFields: string[]; // Fields to return
      conditions: Record<string, any>; // Additional query conditions
    }

    /**
     * State interface for ${formattedEntityName} store
     */
    interface ${formattedEntityName}State {
      // Form Data
      formData: {
        ${config.attributes
          .map(attr => `${formatFieldName(attr.name.replace(/\s+/g, '_'))}: ${
            attr.inputType.toLowerCase() === 'date' ? 'Date | null' :
            attr.inputType.toLowerCase() === 'file' ? 'File[]' :
            attr.inputType.toLowerCase() === 'select' && attr.config?.multiple ? 'string[]' :
            attr.inputType.toLowerCase() === 'number' ? 'number' : 'string'
          }`)
          .join(';\n        ')}
      };
      
      // UI States
      loading: boolean;
      error: string | null;
      success: string | null;
      
      // Records
      records: any[];
      currentRecord: any | null;
      
      // Pagination and Sorting State
      listParams: ListParams;
      totalPages: number;
      currentPage: number;
      totalRecords: number;
      
      // Actions
      setFormData: (data: Partial<${formattedEntityName}State['formData']>) => void;
      resetForm: () => void;
      setError: (error: string | null) => void;
      setSuccess: (message: string | null) => void;
      
      // Field Change Handlers
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      handleDateChange: (field: string, value: Date | null) => void;
      handleFileChange: (field: string, files: File[]) => void;
      handleSelectChange: (field: string, value: string | string[]) => void;
      handleRichTextChange: (field: string, content: string) => void;
      
      // API Actions
      fetchRecords: (params?: Partial<ListParams>) => Promise<any[]>;
      fetchRecord: (id: string) => Promise<any>;
      createRecord: (data: any) => Promise<{ success: string; error: string | null }>;
      updateRecord: (id: string, data: any) => Promise<{ success: string | null; error: string | null }>;
      deleteRecord: (id: string) => Promise<boolean>;
    }

    /**
     * Zustand store for ${formattedEntityName}
     * Manages state and operations for ${formattedEntityName} entities
     */
    export const use${formattedEntityName}Store = create<${formattedEntityName}State>()(
      devtools(
        (set, get) => ({
          // Initial State
          formData: {
            ${config.attributes
              .map(attr => `${formatFieldName(attr.name.replace(/\s+/g, '_'))}: ${generateFieldState(attr)}`)
              .join(',\n')}
          },
          loading: false,
          error: null,
          success: null,
          records: [],
          currentRecord: null,
          listParams: {
            page: 1,
            limit: 10,
            sortBy: 'id',
            orderBy: 'asc',
            search: '',
            searchFields: ${JSON.stringify(config.attributes.map(attr => attr.name.replace(/\s+/g, '_')))},
            returnFields: ${JSON.stringify(['id', ...config.attributes.map(attr => attr.name.replace(/\s+/g, '_'))])},
            conditions: {}
          },
          totalPages: 0,
          currentPage: 1,
          totalRecords: 0,

          // State Setters
          setFormData: (data) => set((state) => ({
            formData: { ...state.formData, ...data }
          })),

          resetForm: () => set((state) => ({
            formData: {
              ${config.attributes
                .map(attr => `${formatFieldName(attr.name.replace(/\s+/g, '_'))}: ${generateFieldState(attr)}`)
                .join(',\n              ')}
            },
            error: null,
            success: null
          })),

          setError: (error) => set({ error }),
          setSuccess: (success) => set({ success }),

          // Field Change Handlers
          handleChange: (e) => {
            const { name, value, type } = e.target;
            set((state) => ({
              formData: {
                ...state.formData,
                [name]: type === 'number' ? Number(value) : value
              }
            }));
          },

          handleDateChange: (field, value) => set((state) => ({
            formData: { ...state.formData, [field]: value }
          })),

          handleFileChange: (field, files) => set((state) => ({
            formData: { ...state.formData, [field]: files }
          })),

          handleSelectChange: (field, value) => set((state) => ({
            formData: { ...state.formData, [field]: value }
          })),

          handleRichTextChange: (field, content) => set((state) => ({
            formData: { ...state.formData, [field]: content }
          })),

          // API Actions
          fetchRecords: async (params?: Partial<ListParams>) => {
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}\`, {
                headers: {
                  'Authorization': \`Bearer \${token}\`,
                  'Content-Type': 'application/json'
                }
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                const errorMessage = data.error?.message || data.message || 'Failed to fetch records';
                set({ error: errorMessage, records: [] });
                return [];
              }
              
              if (!data.success || !data.success.data) {
                const errorMessage = 'Invalid response format from server';
                set({ error: errorMessage, records: [] });
                return [];
              }
              
              const records = data.success.data.result || [];
              
              set({ 
                records,
                totalPages: data.success.data.totalPages || 0,
                currentPage: data.success.data.currentPage || 1,
                totalRecords: data.success.data.totalRecords || 0,
                error: null 
              });
              
              return records;
            } catch (error: any) {
              const errorMessage = error.message || 'An unexpected error occurred while fetching records';
              set({ 
                error: errorMessage,
                records: [],
                totalPages: 0,
                currentPage: 1,
                totalRecords: 0
              });
              return [];
            }
          },

          fetchRecord: async (id: string) => {
            set({ loading: true, error: null })
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                headers: {
                  'Authorization': \`Bearer \${token}\`
                }
              });
              const result = await response.json();

              if (!response.ok) throw new Error(result.message || 'Failed to fetch record');
              
              // Extract data from success response
              if (result.success && result.success.data && result.success.data[0]) {
                const record = result.success.data[0];
                set({ currentRecord: record, formData: record });
                return record;
              }
              return null;
            } catch (error: any) {
              set({ error: error.message });
              return null;
            } finally {
              set({ loading: false });
            }
          },

          createRecord: async (data: any) => {
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}\`, {
                method: 'POST',
                headers: {
                  'Authorization': \`Bearer \${token}\`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

              const result = await response.json();
              
              if (result.success) {
                // Handle successful response
                const successMessage = result.success.message;
                set({ 
                  success: successMessage,
                  error: null
                });
                return { success: successMessage, error: null };
              } else {
                // Handle error response
                const errorMessage = typeof result.error === 'object' 
                  ? result.error.message || JSON.stringify(result.error)
                  : result.error || 'Failed to create record';
                
                set({ 
                  error: errorMessage,
                  success: null
                });
                return { error: errorMessage, success: null };
              }
            } catch (error: any) {
              const errorMessage = error.message || 'An unexpected error occurred';
              set({ 
                error: errorMessage,
                success: null
              });
              return { error: errorMessage, success: null };
            }
          },

          updateRecord: async (id: string, data: any) => {
            set({ loading: true, error: null });
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              // Send PUT request to update endpoint
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'PUT',
                headers: {
                  'Authorization': \`Bearer \${token}\`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
              const result = await response.json();
              
              if (result.success) {
                // Handle successful response
                const successMessage = result.success.message;
                set({ 
                  success: successMessage,
                  error: null 
                });
                return { success: successMessage, error: null };
              } else {
                // Handle error response
                const errorMessage = typeof result.error === 'object'
                  ? result.error.message || JSON.stringify(result.error)
                  : result.error || 'Failed to update record';
                
                set({ 
                  error: errorMessage,
                  success: null 
                });
                return { error: errorMessage, success: null };
              }
            } catch (error: any) {
              // Handle unexpected errors
              const errorMessage = error.message || 'An unexpected error occurred';
              set({ 
                error: errorMessage,
                success: null 
              });
              return { error: errorMessage, success: null };
            } finally {
              set({ loading: false });
            }
          },

          deleteRecord: async (id: string) => {
            set({ loading: true, error: null });
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              // Send DELETE request
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'DELETE',
                headers: {
                  'Authorization': \`Bearer \${token}\`,
                  'Content-Type': 'application/json'
                }
              });
              const result = await response.json();
              
              // Throw error if response not OK
              if (!response.ok) throw new Error(result.error || 'Failed to delete record');
              
              // Update local state by filtering out deleted record
              set((state) => ({
                records: state.records.filter(record => record.id !== id),
                success: 'Record deleted successfully'
              }));
              return true;
            } catch (error: any) {
              set({ error: error.message });
              return false;
            } finally {
              set({ loading: false });
            }
          }
        }),
        { name: \`${formattedEntityName}Store\` }
      )
    );
  `;
}

/**
 * Maps entity data types to TypeScript types
 * 
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} TypeScript type name
 */
function getTypeScriptType(attr: Attribute): string {
  switch (attr.dataType.toLowerCase()) {
    case 'number':
    case 'integer':
    case 'decimal':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'date':
      return 'Date';
    default:
      return 'string';
  }
} 