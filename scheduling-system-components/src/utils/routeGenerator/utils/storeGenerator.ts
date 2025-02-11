import { Entity, Attribute } from '../../../interfaces/types';

function generateFieldState(attr: Attribute): string {
  switch (attr.dataType.toLowerCase()) {
    case 'date':
      return 'null';
    case 'number':
      return '0';
    default:
      return '""';
  }
}

export function generateEntityStore(config: Entity) {
  const initialState = config.attributes
    .map(attr => `${attr.name.replace(/\s+/g, '_')}: ${generateFieldState(attr)}`)
    .join(',\n    ');

  return `
    import { create } from 'zustand';
    import dayjs from 'dayjs';

    interface ${config.entityName}State {
      formData: {
        ${config.attributes
          .map(attr => `${attr.name.replace(/\s+/g, '_')}: ${
            attr.dataType.toLowerCase() === 'date' ? 'Date | null' :
            attr.dataType.toLowerCase() === 'number' ? 'number' : 'string'
          }`)
          .join(';\n        ')}
      };
      loading: boolean;
      error: string | null;

      // Actions
      setFormData: (data: Partial<${config.entityName}State['formData']>) => void;
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      handleDateChange: (field: string, value: Date | null) => void;
      handleSubmit: (e: React.FormEvent) => Promise<void>;
      resetForm: () => void;
    }

    export const use${config.entityName}Store = create<${config.entityName}State>((set, get) => ({
      // Initial state
      formData: {
        ${initialState}
      },
      loading: false,
      error: null,

      // Actions
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),

      handleChange: (e) => {
        const { name, value, type } = e.target;
        set((state) => ({
          formData: { 
            ...state.formData, 
            [name]: type === 'number' ? Number(value) : value 
          }
        }));
      },

      handleDateChange: (field, value) => {
        set((state) => ({
          formData: { ...state.formData, [field]: value }
        }));
      },

      handleSubmit: async (e) => {
        e.preventDefault();
        set({ loading: true, error: null });
        
        try {
          // Convert dates to ISO strings before sending
          const formattedData = Object.entries(get().formData).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value instanceof Date ? value.toISOString() : value
          }), {});

          const response = await fetch('/api/${config.entityName.toLowerCase()}/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formattedData)
          });
          
          if (!response.ok) throw new Error('Failed to submit form');
          
          // Reset form on success
          get().resetForm();
          return true;
        } catch (error) {
          set({ error: error.message });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      resetForm: () => set({
        formData: {
          ${initialState}
        },
        error: null
      })
    }));
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