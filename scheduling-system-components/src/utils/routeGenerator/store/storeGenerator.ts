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
 * Checks if the entity has a custom primary key
 * 
 * @param {Entity} config - Entity configuration
 * @returns {boolean} True if a custom primary key exists
 */
function hasCustomPrimaryKey(config: Entity): boolean {
  return config.attributes.some(attr => attr.constraints.includes('primary key'));
}

/**
 * Gets the primary key field name if it exists
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string | null} Primary key field name or null
 */
function getPrimaryKeyField(config: Entity): string | null {
  const primaryKeyAttr = config.attributes.find(attr => attr.constraints.includes('primary key'));
  return primaryKeyAttr ? primaryKeyAttr.name.replace(/\s+/g, '_') : null;
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
  // Format the entity name for use in identifiers
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Filter out password fields
  const nonPasswordFields = config.attributes
    .filter(attr => 
      !attr.name.toLowerCase().includes('password') && 
      attr.inputType.toLowerCase() !== 'password'
    )
    .map(attr => attr.name.replace(/\s+/g, '_'));

  // Check if entity has a custom primary key
  const customPrimaryKey = hasCustomPrimaryKey(config);
  const primaryKeyField = getPrimaryKeyField(config);
  
  // Determine return fields based on whether a custom primary key exists
  const returnFields = customPrimaryKey 
    ? [...nonPasswordFields] 
    : ['id', ...nonPasswordFields];
  
  // Determine default sort field
  const defaultSortField = customPrimaryKey && primaryKeyField ? primaryKeyField : 'id';

  return `
    import { create } from 'zustand';
    import { devtools } from 'zustand/middleware';
    import Cookies from 'js-cookie';

    // Define the primary key field to use for record identification
    const primaryKeyField = '${customPrimaryKey && primaryKeyField ? primaryKeyField : 'id'}';

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
      createRecord: (data: any) => Promise<{ success: string; error: string | null; recordId?: string }>;
      updateRecord: (id: string, data: any) => Promise<{ success: string | null; error: string | null }>;
      deleteRecord: (id: string) => Promise<{ success: string; error: string | null }>;
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
            sortBy: '${defaultSortField}',
            orderBy: 'asc',
            search: '',
            searchFields: ${JSON.stringify(nonPasswordFields)},
            returnFields: ${JSON.stringify(returnFields)},
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
          /**
           * Fetches records with pagination and filtering
           * @param {Partial<ListParams>} params - Optional parameters for the query
           * @returns {Promise<any[]>} List of records
           */
          fetchRecords: async (params?: Partial<ListParams>) => {
            set({ loading: true, error: null });
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const currentParams = get().listParams;
              const requestParams = {
                ...currentParams,
                ...params
              };
              
              set({ listParams: requestParams });

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': \`Bearer \${token}\`
                },
                body: JSON.stringify(requestParams)
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
            } finally {
              set({ loading: false });
            }
          },

          /**
           * Fetches a single record by ID
           * @param {string} id - Record ID
           * @returns {Promise<any>} Record data or null
           */
          fetchRecord: async (id: string) => {
            set({ loading: true, error: null })
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                headers: {
                  'Authorization': \`Bearer \${token}\`,
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
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

          /**
           * Creates a new record
           * @param {any} data - Record data
           * @returns {Promise<{ success: string; error: string | null; recordId?: string }>} Result with success/error message and record ID
           */
          createRecord: async (data: any) => {
            set({ loading: true, error: null });    
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/create\`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': \`Bearer \${token}\`
                },
                body: JSON.stringify(data)
              });

              const result = await response.json();
              console.log('API Response:', JSON.stringify(result));
              
              if (result.success) {
                // Handle successful response
                const successMessage = result.success.message || 'Record created successfully';
                
                // Extract record ID from response data
                let recordId;
                if (result.success.data) {
                  // Try to get ID from primary key field or fallback to 'id'
                  recordId = result.success.data[primaryKeyField] || result.success.data.id;
                  console.log('Extracted record ID:', recordId, 'from field:', primaryKeyField);
                }
                
                set({ 
                  success: successMessage,
                  error: null
                });
                return { success: successMessage, error: null, recordId };
              } else {
                // Handle error response
                const errorMessage = typeof result.error === 'object' 
                  ? result.error.message || JSON.stringify(result.error)
                  : result.error || 'Failed to create record';
                
                console.error('API Error:', errorMessage);
                set({ 
                  error: errorMessage,
                  success: null
                });
                return { error: errorMessage, success: null };
              }
            } catch (error: any) {
              const errorMessage = error.message || 'An unexpected error occurred';
              console.error('Exception during record creation:', errorMessage);
              set({ 
                error: errorMessage,
                success: null
              });
              return { error: errorMessage, success: null };
            } finally {
              set({ loading: false });
            }
          },

          /**
           * Updates an existing record
           * @param {string} id - ID of record to update
           * @param {any} data - Updated record data
           * @returns {Promise<{ success: string; error: string | null }>} Result with success/error message
           */
          updateRecord: async (id: string, data: any) => {
            set({ loading: true, error: null });
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              // Send PUT request to update endpoint
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'PUT',
                headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': \`Bearer \${token}\`
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

          /**
           * Deletes an existing record
           * @param {string} id - ID of record to delete
           * @returns {Promise<{ success: string; error: string | null }>} Result with success/error message
           */
          deleteRecord: async (id: string) => {
            set({ loading: true, error: null });
            try {
              const token = Cookies.get('accessToken');
              if (!token) throw new Error('Authentication required');

              // Send DELETE request
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': \`Bearer \${token}\`
                }
              });
              const result = await response.json();
              
              if (result.success) {
                // Handle successful response
                const successMessage = result.success.message || 'Record deleted successfully';
                set({ 
                  success: successMessage,
                  error: null,
                  // Update local state by filtering out deleted record
                  records: get().records.filter(record => record[primaryKeyField] !== id)
                });
                return { success: successMessage, error: null };
              } else {
                // Handle error response
                const errorMessage = typeof result.error === 'object'
                  ? result.error.message || JSON.stringify(result.error)
                  : result.error || 'Failed to delete record';
                
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