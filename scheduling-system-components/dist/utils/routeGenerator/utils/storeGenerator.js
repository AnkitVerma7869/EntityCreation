"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityStore = generateEntityStore;
var API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
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
function generateEntityStore(config) {
    return "\n    import { create } from 'zustand';\n    import { devtools } from 'zustand/middleware';\n\n    interface ".concat(config.entityName, "State {\n      // Form Data\n      formData: {\n        ").concat(config.attributes
        .map(function (attr) {
        var _a;
        return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(attr.inputType.toLowerCase() === 'date' ? 'Date | null' :
            attr.inputType.toLowerCase() === 'file' ? 'File[]' :
                attr.inputType.toLowerCase() === 'select' && ((_a = attr.config) === null || _a === void 0 ? void 0 : _a.multiple) ? 'string[]' :
                    attr.inputType.toLowerCase() === 'number' ? 'number' : 'string');
    })
        .join(';\n        '), "\n      };\n      \n      // UI States\n      loading: boolean;\n      error: string | null;\n      success: string | null;\n      \n      // Records\n      records: any[];\n      currentRecord: any | null;\n      \n      // Actions\n      setFormData: (data: Partial<").concat(config.entityName, "State['formData']>) => void;\n      resetForm: () => void;\n      setError: (error: string | null) => void;\n      setSuccess: (message: string | null) => void;\n      \n      // Field Change Handlers\n      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;\n      handleDateChange: (field: string, value: Date | null) => void;\n      handleFileChange: (field: string, files: File[]) => void;\n      handleSelectChange: (field: string, value: string | string[]) => void;\n      handleRichTextChange: (field: string, content: string) => void;\n      \n      // API Actions\n      fetchRecords: () => Promise<void>;\n      fetchRecord: (id: string) => Promise<any>;\n      createRecord: (data: any) => Promise<boolean>;\n      updateRecord: (id: string, data: any) => Promise<boolean>;\n      deleteRecord: (id: string) => Promise<boolean>;\n    }\n\n    export const use").concat(config.entityName, "Store = create<").concat(config.entityName, "State>()(\n      devtools(\n        (set, get) => ({\n          // Initial State\n          formData: {\n            ").concat(config.attributes
        .map(function (attr) { return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(generateFieldState(attr)); })
        .join(',\n            '), "\n          },\n          loading: false,\n          error: null,\n          success: null,\n          records: [],\n          currentRecord: null,\n\n          // State Setters\n          setFormData: (data) => set((state) => ({\n            formData: { ...state.formData, ...data }\n          })),\n\n          resetForm: () => set((state) => ({\n            formData: {\n              ").concat(config.attributes
        .map(function (attr) { return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(generateFieldState(attr)); })
        .join(',\n              '), "\n            },\n            error: null,\n            success: null\n          })),\n\n          setError: (error) => set({ error }),\n          setSuccess: (success) => set({ success }),\n\n          // Field Change Handlers\n          handleChange: (e) => {\n            const { name, value, type } = e.target;\n            set((state) => ({\n              formData: {\n                ...state.formData,\n                [name]: type === 'number' ? Number(value) : value\n              }\n            }));\n          },\n\n          handleDateChange: (field, value) => set((state) => ({\n            formData: { ...state.formData, [field]: value }\n          })),\n\n          handleFileChange: (field, files) => set((state) => ({\n            formData: { ...state.formData, [field]: files }\n          })),\n\n          handleSelectChange: (field, value) => set((state) => ({\n            formData: { ...state.formData, [field]: value }\n          })),\n\n          handleRichTextChange: (field, content) => set((state) => ({\n            formData: { ...state.formData, [field]: content }\n          })),\n\n          // API Actions\n          fetchRecords: async () => {\n            set({ loading: true, error: null });\n            try {\n              const response = await fetch('/api/").concat(config.entityName.toLowerCase(), "/list');\n              const data = await response.json();\n              if (!response.ok) throw new Error(data.error || 'Failed to fetch records');\n              set({ records: data.records || [] });\n              return true;\n            } catch (error: any) {\n              set({ error: error.message });\n              return false;\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          fetchRecord: async (id: string) => {\n            set({ loading: true, error: null })\n            try {\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/${id}`)\n              const result = await response.json();\n\n              if (!response.ok) throw new Error(result.message || 'Failed to fetch record');\n              \n              // Extract data from success response\n              if (result.success && result.success.data && result.success.data[0]) {\n                const record = result.success.data[0];\n                set({ currentRecord: record, formData: record });\n                return record;\n              }\n              return null;\n            } catch (error: any) {\n              set({ error: error.message });\n              return null;\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          createRecord: async (data: any) => {\n            set({ loading: true, error: null });    \n            try {\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/create`, {\n                method: 'POST',\n                headers: { \n                  'Content-Type': 'application/json',\n                  'Accept': 'application/json'\n                },\n                body: JSON.stringify(data)\n              });\n\n              const result = await response.json();\n              \n              if (!response.ok) {\n                throw new Error(result.error || 'Failed to create record');\n              }\n              \n              set({ \n                success: 'Record created successfully',\n                error: null\n              });\n              \n              return true;\n            } catch (error: any) {\n              set({ \n                error: error.message,\n                success: null\n              });\n              return false;\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          updateRecord: async (id: string, data: any) => {\n            set({ loading: true, error: null });\n            try {\n              const response = await fetch(`").concat(API_URL, "/api/v1/").concat(config.entityName.toLowerCase(), "/${id}`, {\n                method: 'PUT',\n                headers: { 'Content-Type': 'application/json' },\n                body: JSON.stringify(data)\n              });\n              const result = await response.json();\n              if (!response.ok) throw new Error(result.error || 'Failed to update record');\n              set({ success: 'Record updated successfully' });\n              return true;\n            } catch (error: any) {\n              set({ error: error.message });\n              return false;\n            } finally {\n              set({ loading: false });\n            }\n          },\n\n          deleteRecord: async (id: string) => {\n            set({ loading: true, error: null });\n            try {\n              const response = await fetch(`").concat(API_URL, "/api/").concat(config.entityName.toLowerCase(), "/${id}`, {\n                method: 'DELETE'\n              });\n              const result = await response.json();\n              if (!response.ok) throw new Error(result.error || 'Failed to delete record');\n              set((state) => ({\n                records: state.records.filter(record => record.id !== id),\n                success: 'Record deleted successfully'\n              }));\n              return true;\n            } catch (error: any) {\n              set({ error: error.message });\n              return false;\n            } finally {\n              set({ loading: false });\n            }\n          }\n        }),\n        { name: `").concat(config.entityName, "Store` }\n      )\n    );\n  ");
}
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
