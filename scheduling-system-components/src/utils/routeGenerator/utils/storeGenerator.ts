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
 * @param {Object} apiMethods - API methods for CRUD operations
 * @returns {string} Generated store implementation
 */
export function generateEntityStore(config: Entity) {
  const formattedEntityName = formatEntityName(config.entityName);
  
  const nonPasswordFields = config.attributes
    .filter(attr => 
      !attr.name.toLowerCase().includes('password') && 
      attr.inputType.toLowerCase() !== 'password'
    )
    .map(attr => attr.name.replace(/\s+/g, '_'));

  // Create the store template with proper escaping
  return `
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { createClientApiMethods } from '@/components/TableForm/src/utils/clientApiMethods';
import { ApiMethods } from '@/components/TableForm/src/interfaces/types';

/**
 * Parameters for list operations
 */
interface ListParams {
  page: number;
  limit: number;
  sortBy: string;
  orderBy: 'asc' | 'desc';
  search: string;
  searchFields: string[];
  returnFields: string[];
  conditions: Record<string, any>;
}

/**
 * State interface for ${formattedEntityName}
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
      .join(';\n    ')}
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
  deleteRecord: (id: string) => Promise<{ success: string; error: string | null }>;
}

/**
 * Zustand store for ${formattedEntityName}
 */
export const create${formattedEntityName}Store = (apiMethods: ApiMethods) => create<${formattedEntityName}State>()(
  devtools(
    (set, get) => ({
      // Initial State
      formData: {
        ${config.attributes
          .map(attr => `${formatFieldName(attr.name.replace(/\s+/g, '_'))}: ${generateFieldState(attr)}`)
          .join(',\n        ')}
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
        searchFields: ${JSON.stringify(nonPasswordFields)},
        returnFields: ${JSON.stringify(['id', ...nonPasswordFields])},
        conditions: {}
      },
      totalPages: 0,
      currentPage: 1,
      totalRecords: 0,

      // State Setters
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      resetForm: () => set(() => ({
        formData: {
          ${config.attributes
            .map(attr => `${formatFieldName(attr.name.replace(/\s+/g, '_'))}: ${generateFieldState(attr)}`)
            .join(',\n          ')}
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
      fetchRecords: async (params) => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get('accessToken');
          if (!token) throw new Error('Authentication token not found');

          const currentParams = get().listParams;
          const requestParams = { ...currentParams, ...params };
          set({ listParams: requestParams });

          const data = await apiMethods.post('/api/v1/${config.entityName.toLowerCase()}', token, requestParams);
          
          if (!data.success?.data) {
            throw new Error(data.message || data.error?.message || 'Invalid response format');
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
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error?.message ||
                              error.message || 
                              'Failed to fetch records';
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

      fetchRecord: async (id) => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get('accessToken');
          if (!token) throw new Error('Authentication token not found');

          const data = await apiMethods.get('/api/v1/${config.entityName.toLowerCase()}/' + id, token);
          
          if (data.success?.data?.[0]) {
            const record = data.success.data[0];
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

      createRecord: async (data) => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get('accessToken');
          if (!token) throw new Error('Authentication token not found');

          const result = await apiMethods.post('/api/v1/${config.entityName.toLowerCase()}/create', token, data);
          
          if (result.success) {
            const message = result.success.message;
            set({ success: message, error: null });
            return { success: message, error: null };
          }
          
          throw new Error(result.error || 'Failed to create record');
        } catch (error: any) {
          const message = error.message;
          set({ error: message, success: null });
          return { error: message, success: null };
        } finally {
          set({ loading: false });
        }
      },

      updateRecord: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get('accessToken');
          if (!token) throw new Error('Authentication token not found');

          const result = await apiMethods.put('/api/v1/${config.entityName.toLowerCase()}/' + id, token, data);
          
          if (result.success) {
            const message = result.success.message;
            set({ success: message, error: null });
            return { success: message, error: null };
          }
          
          throw new Error(result.error || 'Failed to update record');
        } catch (error: any) {
          const message = error.message;
          set({ error: message, success: null });
          return { error: message, success: null };
        } finally {
          set({ loading: false });
        }
      },

      deleteRecord: async (id) => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get('accessToken');
          if (!token) throw new Error('Authentication token not found');

          const result = await apiMethods.delete('/api/v1/${config.entityName.toLowerCase()}/' + id, token, null);
          
          if (result.success) {
            const message = result.success.message || 'Record deleted successfully';
            set({ 
              success: message, 
              error: null,
              records: get().records.filter(record => record.id !== id)
            });
            return { success: message, error: null };
          }
          
          throw new Error(result.error || 'Failed to delete record');
        } catch (error: any) {
          const message = error.message;
          set({ error: message, success: null });
          return { error: message, success: null };
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: '${formattedEntityName}Store' }
  )
);

// Create store instance
const baseUrl = process.env.NEXT_PUBLIC_API_URL_ENDPOINT || '';
const apiMethods = createClientApiMethods(baseUrl);
export const use${formattedEntityName}Store = create${formattedEntityName}Store(apiMethods);`;
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