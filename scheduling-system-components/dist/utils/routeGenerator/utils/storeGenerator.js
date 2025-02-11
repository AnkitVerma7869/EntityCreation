"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityStore = generateEntityStore;
function generateFieldState(attr) {
    switch (attr.dataType.toLowerCase()) {
        case 'date':
            return 'null';
        case 'number':
            return '0';
        default:
            return '""';
    }
}
function generateEntityStore(config) {
    var initialState = config.attributes
        .map(function (attr) { return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(generateFieldState(attr)); })
        .join(',\n    ');
    return "\n    import { create } from 'zustand';\n    import dayjs from 'dayjs';\n\n    interface ".concat(config.entityName, "State {\n      formData: {\n        ").concat(config.attributes
        .map(function (attr) { return "".concat(attr.name.replace(/\s+/g, '_'), ": ").concat(attr.dataType.toLowerCase() === 'date' ? 'Date | null' :
        attr.dataType.toLowerCase() === 'number' ? 'number' : 'string'); })
        .join(';\n        '), "\n      };\n      loading: boolean;\n      error: string | null;\n\n      // Actions\n      setFormData: (data: Partial<").concat(config.entityName, "State['formData']>) => void;\n      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;\n      handleDateChange: (field: string, value: Date | null) => void;\n      handleSubmit: (e: React.FormEvent) => Promise<void>;\n      resetForm: () => void;\n    }\n\n    export const use").concat(config.entityName, "Store = create<").concat(config.entityName, "State>((set, get) => ({\n      // Initial state\n      formData: {\n        ").concat(initialState, "\n      },\n      loading: false,\n      error: null,\n\n      // Actions\n      setFormData: (data) => set((state) => ({\n        formData: { ...state.formData, ...data }\n      })),\n\n      handleChange: (e) => {\n        const { name, value, type } = e.target;\n        set((state) => ({\n          formData: { \n            ...state.formData, \n            [name]: type === 'number' ? Number(value) : value \n          }\n        }));\n      },\n\n      handleDateChange: (field, value) => {\n        set((state) => ({\n          formData: { ...state.formData, [field]: value }\n        }));\n      },\n\n      handleSubmit: async (e) => {\n        e.preventDefault();\n        set({ loading: true, error: null });\n        \n        try {\n          // Convert dates to ISO strings before sending\n          const formattedData = Object.entries(get().formData).reduce((acc, [key, value]) => ({\n            ...acc,\n            [key]: value instanceof Date ? value.toISOString() : value\n          }), {});\n\n          const response = await fetch('/api/").concat(config.entityName.toLowerCase(), "/create', {\n            method: 'POST',\n            headers: { 'Content-Type': 'application/json' },\n            body: JSON.stringify(formattedData)\n          });\n          \n          if (!response.ok) throw new Error('Failed to submit form');\n          \n          // Reset form on success\n          get().resetForm();\n          return true;\n        } catch (error) {\n          set({ error: error.message });\n          return false;\n        } finally {\n          set({ loading: false });\n        }\n      },\n\n      resetForm: () => set({\n        formData: {\n          ").concat(initialState, "\n        },\n        error: null\n      })\n    }));\n  ");
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
