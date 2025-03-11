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
    var formattedEntityName = formatEntityName(config.entityName);
    var nonPasswordFields = config.attributes
        .filter(function (attr) {
        return !attr.name.toLowerCase().includes('password') &&
            attr.inputType.toLowerCase() !== 'password';
    })
        .map(function (attr) { return attr.name.replace(/\s+/g, '_'); });
    // Create the store template with proper escaping
    return "\nimport { create } from 'zustand';\nimport { devtools } from 'zustand/middleware';\nimport Cookies from 'js-cookie';\nimport { get, post, put, del } from '@/utils/apiCalls';\n\n/**\n * Parameters for list operations\n */\ninterface ListParams {\n  page: number;\n  limit: number;\n  sortBy: string;\n  orderBy: 'asc' | 'desc';\n  search: string;\n  searchFields: string[];\n  returnFields: string[];\n  conditions: Record<string, any>;\n}\n\n/**\n * State interface for ".concat(formattedEntityName, "\n */\ninterface ").concat(formattedEntityName, "State {\n  // Form Data\n  formData: {\n    ").concat(config.attributes
        .map(function (attr) {
        var _a;
        return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(attr.inputType.toLowerCase() === 'date' ? 'Date | null' :
            attr.inputType.toLowerCase() === 'file' ? 'File[]' :
                attr.inputType.toLowerCase() === 'select' && ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) ? 'string[]' :
                    attr.inputType.toLowerCase() === 'number' ? 'number' : 'string');
    })
        .join(';\n    '), "\n  };\n  \n  // UI States\n  loading: boolean;\n  error: string | null;\n  success: string | null;\n  \n  // Records\n  records: any[];\n  currentRecord: any | null;\n  \n  // Pagination and Sorting State\n  listParams: ListParams;\n  totalPages: number;\n  currentPage: number;\n  totalRecords: number;\n  \n  // Actions\n  setFormData: (data: Partial<").concat(formattedEntityName, "State['formData']>) => void;\n  resetForm: () => void;\n  setError: (error: string | null) => void;\n  setSuccess: (message: string | null) => void;\n  \n  // Field Change Handlers\n  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;\n  handleDateChange: (field: string, value: Date | null) => void;\n  handleFileChange: (field: string, files: File[]) => void;\n  handleSelectChange: (field: string, value: string | string[]) => void;\n  handleRichTextChange: (field: string, content: string) => void;\n  \n  // API Actions\n  fetchRecords: (params?: Partial<ListParams>) => Promise<any[]>;\n  fetchRecord: (id: string) => Promise<any>;\n  createRecord: (data: any) => Promise<{ success: string; error: string | null }>;\n  updateRecord: (id: string, data: any) => Promise<{ success: string | null; error: string | null }>;\n  deleteRecord: (id: string) => Promise<{ success: string; error: string | null }>;\n}\n\n/**\n * Zustand store for ").concat(formattedEntityName, "\n */\nexport const use").concat(formattedEntityName, "Store = create<").concat(formattedEntityName, "State>()(\n  devtools(\n    (set, get) => ({\n      // Initial State\n      formData: {\n        ").concat(config.attributes
        .map(function (attr) { return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(generateFieldState(attr)); })
        .join(',\n        '), "\n      },\n      loading: false,\n      error: null,\n      success: null,\n      records: [],\n      currentRecord: null,\n      listParams: {\n        page: 1,\n        limit: 10,\n        sortBy: 'id',\n        orderBy: 'asc',\n        search: '',\n        searchFields: ").concat(JSON.stringify(nonPasswordFields), ",\n        returnFields: ").concat(JSON.stringify(__spreadArray(['id'], nonPasswordFields, true)), ",\n        conditions: {}\n      },\n      totalPages: 0,\n      currentPage: 1,\n      totalRecords: 0,\n\n      // State Setters\n      setFormData: (data) => set((state) => ({\n        formData: { ...state.formData, ...data }\n      })),\n\n      resetForm: () => set(() => ({\n        formData: {\n          ").concat(config.attributes
        .map(function (attr) { return "".concat(formatFieldName(attr.name.replace(/\s+/g, '_')), ": ").concat(generateFieldState(attr)); })
        .join(',\n          '), "\n        },\n        error: null,\n        success: null\n      })),\n\n      setError: (error) => set({ error }),\n      setSuccess: (success) => set({ success }),\n\n      // Field Change Handlers\n      handleChange: (e) => {\n        const { name, value, type } = e.target;\n        set((state) => ({\n          formData: {\n            ...state.formData,\n            [name]: type === 'number' ? Number(value) : value\n          }\n        }));\n      },\n\n      handleDateChange: (field, value) => set((state) => ({\n        formData: { ...state.formData, [field]: value }\n      })),\n\n      handleFileChange: (field, files) => set((state) => ({\n        formData: { ...state.formData, [field]: files }\n      })),\n\n      handleSelectChange: (field, value) => set((state) => ({\n        formData: { ...state.formData, [field]: value }\n      })),\n\n      handleRichTextChange: (field, content) => set((state) => ({\n        formData: { ...state.formData, [field]: content }\n      })),\n\n      // API Actions\n      fetchRecords: async (params) => {\n        set({ loading: true, error: null });\n        try {\n          const token = Cookies.get('accessToken');\n          if (!token) throw new Error('Authentication token not found');\n\n          const currentParams = get().listParams;\n          const requestParams = { ...currentParams, ...params };\n          set({ listParams: requestParams });\n\n          const data = await post('/api/v1/").concat(config.entityName.toLowerCase(), "', token, requestParams);\n          \n          if (!data.success?.data) throw new Error('Invalid response format');\n          \n          const records = data.success.data.result || [];\n          set({ \n            records,\n            totalPages: data.success.data.totalPages || 0,\n            currentPage: data.success.data.currentPage || 1,\n            totalRecords: data.success.data.totalRecords || 0,\n            error: null \n          });\n          \n          return records;\n        } catch (error: any) {\n          const errorMessage = error.message || 'Failed to fetch records';\n          set({ error: errorMessage, records: [], totalPages: 0, currentPage: 1, totalRecords: 0 });\n          return [];\n        } finally {\n          set({ loading: false });\n        }\n      },\n\n      fetchRecord: async (id) => {\n        set({ loading: true, error: null });\n        try {\n          const token = Cookies.get('accessToken');\n          if (!token) throw new Error('Authentication token not found');\n\n          const data = await get('/api/v1/").concat(config.entityName.toLowerCase(), "/' + id, token);\n          \n          if (data.success?.data?.[0]) {\n            const record = data.success.data[0];\n            set({ currentRecord: record, formData: record });\n            return record;\n          }\n          return null;\n        } catch (error: any) {\n          set({ error: error.message });\n          return null;\n        } finally {\n          set({ loading: false });\n        }\n      },\n\n      createRecord: async (data) => {\n        set({ loading: true, error: null });\n        try {\n          const token = Cookies.get('accessToken');\n          if (!token) throw new Error('Authentication token not found');\n\n          const result = await post('/api/v1/").concat(config.entityName.toLowerCase(), "/create', token, data);\n          \n          if (result.success) {\n            const message = result.success.message;\n            set({ success: message, error: null });\n            return { success: message, error: null };\n          }\n          \n          throw new Error(result.error || 'Failed to create record');\n        } catch (error: any) {\n          const message = error.message;\n          set({ error: message, success: null });\n          return { error: message, success: null };\n        } finally {\n          set({ loading: false });\n        }\n      },\n\n      updateRecord: async (id, data) => {\n        set({ loading: true, error: null });\n        try {\n          const token = Cookies.get('accessToken');\n          if (!token) throw new Error('Authentication token not found');\n\n          const result = await put('/api/v1/").concat(config.entityName.toLowerCase(), "/' + id, token, data);\n          \n          if (result.success) {\n            const message = result.success.message;\n            set({ success: message, error: null });\n            return { success: message, error: null };\n          }\n          \n          throw new Error(result.error || 'Failed to update record');\n        } catch (error: any) {\n          const message = error.message;\n          set({ error: message, success: null });\n          return { error: message, success: null };\n        } finally {\n          set({ loading: false });\n        }\n      },\n\n      deleteRecord: async (id) => {\n        set({ loading: true, error: null });\n        try {\n          const token = Cookies.get('accessToken');\n          if (!token) throw new Error('Authentication token not found');\n\n          const result = await del('/api/v1/").concat(config.entityName.toLowerCase(), "/' + id, token, null);\n          \n          if (result.success) {\n            const message = result.success.message || 'Record deleted successfully';\n            set({ \n              success: message, \n              error: null,\n              records: get().records.filter(record => record.id !== id)\n            });\n            return { success: message, error: null };\n          }\n          \n          throw new Error(result.error || 'Failed to delete record');\n        } catch (error: any) {\n          const message = error.message;\n          set({ error: message, success: null });\n          return { error: message, success: null };\n        } finally {\n          set({ loading: false });\n        }\n      }\n    }),\n    { name: '").concat(formattedEntityName, "Store' }\n  )\n);");
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
