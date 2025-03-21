"use strict";
/**
 * Store Generator Module
 * Generates Zustand store implementations for entity state management
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityStore = generateEntityStore;
var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 *
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name) {
    return name
        // Replace hyphens and spaces with underscores first
        .replace(/[-\s]+/g, '_')
        // Split by underscores
        .split('_')
        // Capitalize first letter of each word
        .map(function (word, index) {
        var capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
function formatFieldName(name) {
    return name.includes('-') ? "'".concat(name, "'") : name;
}
/**
 * Checks if the entity has a custom primary key
 *
 * @param {Entity} config - Entity configuration
 * @returns {boolean} True if a custom primary key exists
 */
function hasCustomPrimaryKey(config) {
    return config.attributes.some(function (attr) { return attr.constraints.includes('primary key'); });
}
/**
 * Gets the primary key field name if it exists
 *
 * @param {Entity} config - Entity configuration
 * @returns {string | null} Primary key field name or null
 */
function getPrimaryKeyField(config) {
    var primaryKeyAttr = config.attributes.find(function (attr) { return attr.constraints.includes('primary key'); });
    return primaryKeyAttr ? primaryKeyAttr.name.replace(/\s+/g, '_') : null;
}
/**
 * Generates initial state value for a field based on its input type
 *
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} Initial state value as string literal
 */
function generateFieldState(attr) {
    var _a;
    switch (attr.inputType.toLowerCase()) {
        case 'date':
            return 'null';
        case 'file':
            return '[]';
        case 'select':
        case 'multiselect':
            return ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) ? '[]' : '""';
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
function generateEntityStore(config) {
    // Format the entity name for use in identifiers
    var formattedEntityName = formatEntityName(config.entityName);
    // Filter out password fields
    var nonPasswordFields = config.attributes
        .filter(function (attr) {
        return !attr.name.toLowerCase().includes('password') &&
            attr.inputType.toLowerCase() !== 'password';
    })
        .map(function (attr) { return attr.name.replace(/\s+/g, '_'); });
    // Check if entity has a custom primary key
    var customPrimaryKey = hasCustomPrimaryKey(config);
    var primaryKeyField = getPrimaryKeyField(config);
    // Determine return fields based on whether a custom primary key exists
    var returnFields = customPrimaryKey
        ? __spreadArray([], nonPasswordFields, true) : __spreadArray(['id'], nonPasswordFields, true);
    // Determine default sort field
    var defaultSortField = customPrimaryKey && primaryKeyField ? primaryKeyField : 'id';
    return "\n    import { create } from 'zustand';\n    import { devtools } from 'zustand/middleware';\n    import Cookies from 'js-cookie';\n\n    // Define the primary key field to use for record identification\n    const primaryKeyField = '".concat(customPrimaryKey && primaryKeyField ? primaryKeyField : 'id', "';\n\n    /**\n     * Parameters for list operations\n     */\n    interface ListParams {\n      page: number;          // Current page number\n      limit: number;         // Items per page\n      sortBy: string;        // Field to sort by\n      orderBy: 'asc' | 'desc'; // Sort direction\n      search: string;        // Search query\n      searchFields: string[]; // Fields to search in\n      returnFields: string[]; // Fields to return\n      conditions: Record<string, any>; // Additional query conditions\n    }\n\n    /**\n     * State interface for ").concat(formattedEntityName, " store\n     */\n    interface ").concat(formattedEntityName, "State {\n      // Form Data\n      formData: {\n        ").concat(config.attributes
        .map(function (attr) {
        var _a;
        return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(attr.inputType.toLowerCase() === 'date' ? 'Date | null' :
            attr.inputType.toLowerCase() === 'file' ? 'File[]' :
                attr.inputType.toLowerCase() === 'select' && ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) ? 'string[]' :
                    attr.inputType.toLowerCase() === 'number' ? 'number' : 'string');
    })
        .join(';\n        '), "\n      };\n      \n      // UI States\n      loading: boolean;\n      error: string | null;\n      success: string | null;\n      \n      // Records\n      records: any[];\n      currentRecord: any | null;\n      \n      // Pagination and Sorting State\n      listParams: ListParams;\n      totalPages: number;\n      currentPage: number;\n      totalRecords: number;\n      \n      // Actions\n      setFormData: (data: Partial<").concat(formattedEntityName, "State['formData']>) => void;\n      resetForm: () => void;\n      setError: (error: string | null) => void;\n      setSuccess: (message: string | null) => void;\n      \n      // Field Change Handlers\n      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;\n      handleDateChange: (field: string, value: Date | null) => void;\n      handleFileChange: (field: string, files: File[]) => void;\n      handleSelectChange: (field: string, value: string | string[]) => void;\n      handleRichTextChange: (field: string, content: string) => void;\n      \n      // API Actions\n      fetchRecords: (params?: Partial<ListParams>) => Promise<any[]>;\n      fetchRecord: (id: string) => Promise<any>;\n      createRecord: (data: any) => Promise<{ success: string; error: string | null; recordId?: string }>;\n      updateRecord: (id: string, data: any) => Promise<{ success: string | null; error: string | null }>;\n      deleteRecord: (id: string) => Promise<{ success: string; error: string | null }>;\n    }\n\n    /**\n     * Zustand store for ").concat(formattedEntityName, "\n     * Manages state and operations for ").concat(formattedEntityName, " entities\n     */\n    export const use").concat(formattedEntityName, "Store = create<").concat(formattedEntityName, "State>()(\n      devtools(\n        (set, get) => ({\n          // Initial State\n          formData: {\n            ").concat(config.attributes
        .map(function (attr) { return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(generateFieldState(attr)); })
        .join(',\n'), "\n          },\n          loading: false,\n          error: null,\n          success: null,\n          records: [],\n          currentRecord: null,\n          listParams: {\n            page: 1,\n            limit: 10,\n            sortBy: '").concat(defaultSortField, "',\n            orderBy: 'asc',\n            search: '',\n            searchFields: ").concat(JSON.stringify(nonPasswordFields), ",\n            returnFields: ").concat(JSON.stringify(returnFields), ",\n            conditions: {}\n          },\n          totalPages: 0,\n          currentPage: 1,\n          totalRecords: 0,\n\n          // State Setters\n          setFormData: (data) => set((state) => ({\n            formData: { ...state.formData, ...data }\n          })),\n\n          resetForm: () => set((state) => ({\n            formData: {\n              ").concat(config.attributes
        .map(function (attr) { return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(generateFieldState(attr)); })
        .join(',\n              '), "\n            },\n            error: null,\n            success: null\n          })),\n\n          setError: (error) => set({ error }),\n          setSuccess: (success) => set({ success }),\n\n          // Field Change Handlers\n          handleChange: (e) => {\n            const { name, value, type } = e.target;\n            set((state) => ({\n              formData: {\n                ...state.formData,\n                [name]: type === 'number' ? Number(value) : value\n              }\n            }));\n          },\n\n          handleDateChange: (field, value) => set((state) => ({\n            formData: { ...state.formData, [field]: value }\n          })),\n\n          handleFileChange: (field, files) => set((state) => ({\n            formData: { ...state.formData, [field]: files }\n          })),\n\n          handleSelectChange: (field, value) => set((state) => ({\n            formData: { ...state.formData, [field]: value }\n          })),\n\n          handleRichTextChange: (field, content) => set((state) => ({\n            formData: { ...state.formData, [field]: content }\n          })),\n\n          // API Actions\n          /**\n           * Fetches records with pagination and filtering\n           * @param {Partial<ListParams>} params - Optional parameters for the query\n           * @returns {Promise<any[]>} List of records\n           */\n          fetchRecords: async (params?: Partial<ListParams>) => {\n            set({ loading: true, error: null });\n            try {\n              const token = Cookies.get('accessToken');\n              if (!token) throw new Error('Authentication required');\n\n              const currentParams = get().listParams;\n              const requestParams = {\n                ...currentParams,\n                ...params\n              };\n              \n              set({ listParams: requestParams });\n\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/`, {\n                method: 'POST',\n                headers: {\n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json',\n                  'Authorization': `Bearer ${token}`\n                },\n                body: JSON.stringify(requestParams)\n              });\n              \n              const data = await response.json();\n              \n              if (!response.ok) {\n                const errorMessage = data.error?.message || data.message || 'Failed to fetch records';\n                set({ error: errorMessage, records: [] });\n                return [];\n              }\n              \n              if (!data.success || !data.success.data) {\n                const errorMessage = 'Invalid response format from server';\n                set({ error: errorMessage, records: [] });\n                return [];\n              }\n              \n              const records = data.success.data.result || [];\n              \n              set({ \n                records,\n                totalPages: data.success.data.totalPages || 0,\n                currentPage: data.success.data.currentPage || 1,\n                totalRecords: data.success.data.totalRecords || 0,\n                error: null \n              });\n              \n              return records;\n            } catch (error: any) {\n              const errorMessage = error.message || 'An unexpected error occurred while fetching records';\n              set({ \n                error: errorMessage,\n                records: [],\n                totalPages: 0,\n                currentPage: 1,\n                totalRecords: 0\n              });\n              return [];\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          /**\n           * Fetches a single record by ID\n           * @param {string} id - Record ID\n           * @returns {Promise<any>} Record data or null\n           */\n          fetchRecord: async (id: string) => {\n            set({ loading: true, error: null })\n            try {\n              const token = Cookies.get('accessToken');\n              if (!token) throw new Error('Authentication required');\n\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/${id}`, {\n                headers: {\n                  'Authorization': `Bearer ${token}`,\n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json'\n                }\n              });\n              const result = await response.json();\n\n              if (!response.ok) throw new Error(result.message || 'Failed to fetch record');\n              \n              // Extract data from success response\n              if (result.success && result.success.data && result.success.data[0]) {\n                const record = result.success.data[0];\n                set({ currentRecord: record, formData: record });\n                return record;\n              }\n              return null;\n            } catch (error: any) {\n              set({ error: error.message });\n              return null;\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          /**\n           * Creates a new record\n           * @param {any} data - Record data\n           * @returns {Promise<{ success: string; error: string | null; recordId?: string }>} Result with success/error message and record ID\n           */\n          createRecord: async (data: any) => {\n            set({ loading: true, error: null });    \n            try {\n              const token = Cookies.get('accessToken');\n              if (!token) throw new Error('Authentication required');\n\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/create`, {\n                method: 'POST',\n                headers: { \n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json',\n                  'Authorization': `Bearer ${token}`\n                },\n                body: JSON.stringify(data)\n              });\n\n              const result = await response.json();\n              console.log('API Response:', JSON.stringify(result));\n              \n              if (result.success) {\n                // Handle successful response\n                const successMessage = result.success.message || 'Record created successfully';\n                \n                // Extract record ID from response data\n                let recordId;\n                if (result.success.data) {\n                  // Try to get ID from primary key field or fallback to 'id'\n                  recordId = result.success.data[primaryKeyField] || result.success.data.id;\n                  console.log('Extracted record ID:', recordId, 'from field:', primaryKeyField);\n                }\n                \n                set({ \n                  success: successMessage,\n                  error: null\n                });\n                return { success: successMessage, error: null, recordId };\n              } else {\n                // Handle error response\n                const errorMessage = typeof result.error === 'object' \n                  ? result.error.message || JSON.stringify(result.error)\n                  : result.error || 'Failed to create record';\n                \n                console.error('API Error:', errorMessage);\n                set({ \n                  error: errorMessage,\n                  success: null\n                });\n                return { error: errorMessage, success: null };\n              }\n            } catch (error: any) {\n              const errorMessage = error.message || 'An unexpected error occurred';\n              console.error('Exception during record creation:', errorMessage);\n              set({ \n                error: errorMessage,\n                success: null\n              });\n              return { error: errorMessage, success: null };\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          /**\n           * Updates an existing record\n           * @param {string} id - ID of record to update\n           * @param {any} data - Updated record data\n           * @returns {Promise<{ success: string; error: string | null }>} Result with success/error message\n           */\n          updateRecord: async (id: string, data: any) => {\n            set({ loading: true, error: null });\n            try {\n              const token = Cookies.get('accessToken');\n              if (!token) throw new Error('Authentication required');\n\n              // Send PUT request to update endpoint\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/${id}`, {\n                method: 'PUT',\n                headers: { \n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json',\n                  'Authorization': `Bearer ${token}`\n                },\n                body: JSON.stringify(data)\n              });\n              const result = await response.json();\n              \n              if (result.success) {\n                // Handle successful response\n                const successMessage = result.success.message;\n                set({ \n                  success: successMessage,\n                  error: null \n                });\n                return { success: successMessage, error: null };\n              } else {\n                // Handle error response\n                const errorMessage = typeof result.error === 'object'\n                  ? result.error.message || JSON.stringify(result.error)\n                  : result.error || 'Failed to update record';\n                \n                set({ \n                  error: errorMessage,\n                  success: null \n                });\n                return { error: errorMessage, success: null };\n              }\n            } catch (error: any) {\n              // Handle unexpected errors\n              const errorMessage = error.message || 'An unexpected error occurred';\n              set({ \n                error: errorMessage,\n                success: null \n              });\n              return { error: errorMessage, success: null };\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          /**\n           * Deletes an existing record\n           * @param {string} id - ID of record to delete\n           * @returns {Promise<{ success: string; error: string | null }>} Result with success/error message\n           */\n          deleteRecord: async (id: string) => {\n            set({ loading: true, error: null });\n            try {\n              const token = Cookies.get('accessToken');\n              if (!token) throw new Error('Authentication required');\n\n              // Send DELETE request\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/${id}`, {\n                method: 'DELETE',\n                headers: {\n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json',\n                  'Authorization': `Bearer ${token}`\n                }\n              });\n              const result = await response.json();\n              \n              if (result.success) {\n                // Handle successful response\n                const successMessage = result.success.message || 'Record deleted successfully';\n                set({ \n                  success: successMessage,\n                  error: null,\n                  // Update local state by filtering out deleted record\n                  records: get().records.filter(record => record[primaryKeyField] !== id)\n                });\n                return { success: successMessage, error: null };\n              } else {\n                // Handle error response\n                const errorMessage = typeof result.error === 'object'\n                  ? result.error.message || JSON.stringify(result.error)\n                  : result.error || 'Failed to delete record';\n                \n                set({ \n                  error: errorMessage,\n                  success: null \n                });\n                return { error: errorMessage, success: null };\n              }\n            } catch (error: any) {\n              // Handle unexpected errors\n              const errorMessage = error.message || 'An unexpected error occurred';\n              set({ \n                error: errorMessage,\n                success: null \n              });\n              return { error: errorMessage, success: null };\n            } finally {\n              set({ loading: false });\n            }\n          }\n        }),\n        { name: `").concat(formattedEntityName, "Store` }\n      )\n    );\n  ");
}
/**
 * Maps entity data types to TypeScript types
 *
 * @param {Attribute} attr - Field attribute configuration
 * @returns {string} TypeScript type name
 */
function getTypeScriptType(attr) {
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
