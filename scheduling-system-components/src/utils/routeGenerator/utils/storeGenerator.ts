import { Entity, Attribute } from '../../../interfaces/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL_ENDPOINT;
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

export function generateEntityStore(config: Entity) {
  return `
    import { create } from 'zustand';
    import { devtools } from 'zustand/middleware';

    interface ${config.entityName}State {
      // Form Data
      formData: {
        ${config.attributes
          .map(attr => `${attr.name.replace(/\s+/g, '_')}: ${
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
      
      // Actions
      setFormData: (data: Partial<${config.entityName}State['formData']>) => void;
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
      fetchRecords: () => Promise<void>;
      fetchRecord: (id: string) => Promise<any>;
      createRecord: (data: any) => Promise<boolean>;
      updateRecord: (id: string, data: any) => Promise<boolean>;
      deleteRecord: (id: string) => Promise<boolean>;
    }

    export const use${config.entityName}Store = create<${config.entityName}State>()(
      devtools(
        (set, get) => ({
          // Initial State
          formData: {
            ${config.attributes
              .map(attr => `${attr.name.replace(/\s+/g, '_')}: ${generateFieldState(attr)}`)
              .join(',\n            ')}
          },
          loading: false,
          error: null,
          success: null,
          records: [],
          currentRecord: null,

          // State Setters
          setFormData: (data) => set((state) => ({
            formData: { ...state.formData, ...data }
          })),

          resetForm: () => set((state) => ({
            formData: {
              ${config.attributes
                .map(attr => `${attr.name.replace(/\s+/g, '_')}: ${generateFieldState(attr)}`)
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
          fetchRecords: async () => {
            set({ loading: true, error: null });
            try {
              const response = await fetch('/api/${config.entityName.toLowerCase()}/list');
              const data = await response.json();
              if (!response.ok) throw new Error(data.error || 'Failed to fetch records');
              set({ records: data.records || [] });
              return true;
            } catch (error: any) {
              set({ error: error.message });
              return false;
            } finally {
              set({ loading: false });
            }
          },

          fetchRecord: async (id: string) => {
            set({ loading: true, error: null })
            try {
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`)
              const result = await response.json();

              if (!response.ok) throw new Error(result.message || 'Failed to fetch record');
              const record = result.data?.[0]; // Ensure we get the first object in the array
              if (record) {
                // Normalize datetime fields for <input type="datetime-local">
                const formattedRecord = {
                  ...record,
                  created_at: record.created_at ? record.created_at.split(".")[0] : "",
                  updated_at: record.updated_at ? record.updated_at.split(".")[0] : "",
                };

                set({ currentRecord: formattedRecord, formData: formattedRecord });
                return formattedRecord;
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
            set({ loading: true, error: null });    
            try {
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/create\`, {
                method: 'POST',
                headers: { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(data)
              });

              const result = await response.json();
              
              if (!response.ok) {
                throw new Error(result.error || 'Failed to create record');
              }
              
              set({ 
                success: 'Record created successfully',
                error: null
              });
              
              return true;
            } catch (error: any) {
              set({ 
                error: error.message,
                success: null
              });
              return false;
            } finally {
              set({ loading: false });
            }
          },

          updateRecord: async (id: string, data: any) => {
            set({ loading: true, error: null });
            try {
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.error || 'Failed to update record');
              set({ success: 'Record updated successfully' });
              return true;
            } catch (error: any) {
              set({ error: error.message });
              return false;
            } finally {
              set({ loading: false });
            }
          },

          deleteRecord: async (id: string) => {
            set({ loading: true, error: null });
            try {
              const response = await fetch(\`${API_URL}/api/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'DELETE'
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.error || 'Failed to delete record');
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
        { name: \`${config.entityName}Store\` }
      )
    );
  `;
}

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