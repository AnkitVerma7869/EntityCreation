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
  // Filter out password fields
  const nonPasswordFields = config.attributes
    .filter(attr => 
      !attr.name.toLowerCase().includes('password') && 
      attr.inputType.toLowerCase() !== 'password'
    )
    .map(attr => attr.name.replace(/\s+/g, '_'));

  return `
    import { create } from 'zustand';
    import { devtools } from 'zustand/middleware';

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
      
      // Pagination and Sorting State
      listParams: ListParams;
      totalPages: number;
      currentPage: number;
      totalRecords: number;
      
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
      fetchRecords: (params?: Partial<ListParams>) => Promise<any[]>;
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
          fetchRecords: async (params?: Partial<ListParams>) => {
            set({ loading: true, error: null });
            try {
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
                  'Accept': 'application/json'
                },
                body: JSON.stringify(requestParams)
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch records');
              }
              
              const records = data.success?.data?.result || [];
              
              set({ 
                totalPages: data.success?.data?.totalPages || 0,
                currentPage: data.success?.data?.currentPage || 1,
                totalRecords: data.success?.data?.totalRecords || 0,
                error: null 
              });
              
              return records;
            } catch (error: any) {
              set({ error: error.message });
              return [];
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
              const response = await fetch(\`${API_URL}/api/v1/${config.entityName.toLowerCase()}/\${id}\`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
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