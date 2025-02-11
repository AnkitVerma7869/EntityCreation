import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateFormFields } from '../../utils/formGenerator';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';

export function generateEditPage(config: Entity): string {
  const { imports } = generateFormFields(config.attributes);
  
  return `
    'use client';
    ${imports}
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import { LocalizationProvider } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';

    // Generate validation schema based on attributes
    const validationSchema = yup.object({
      ${generateValidationSchema(config.attributes)}
    });

    export default function ${config.entityName}EditPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { loading, error, updateRecord, fetchRecord } = use${config.entityName}Store();
      
      const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue,
        watch,
        reset
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          ${config.attributes.map(attr => {
            const fieldName = attr.name.replace(/\s+/g, '_');
            if (attr.dataType.toLowerCase() === 'date') {
              return `${fieldName}: null`;
            } else if (attr.dataType.toLowerCase() === 'number') {
              return `${fieldName}: 0`;
            }
            return `${fieldName}: ""`;
          }).join(',\n          ')}
        }
      });

      useEffect(() => {
        const loadRecord = async () => {
          const record = await fetchRecord(params.id);
          if (record) {
            reset(record);
          }
        };
        loadRecord();
      }, [params.id, reset]);

      const onSubmit = async (data: any) => {
        const success = await updateRecord(params.id, data);
        if (success) {
          router.push('/${config.entityName.toLowerCase()}/list');
        }
      };

      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Edit ${config.entityName}</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-500 rounded">
              {error}
            </div>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              ${config.attributes.map(attr => {
                const fieldName = attr.name.replace(/\s+/g, '_');
                
                if (attr.dataType.toLowerCase() === 'date') {
                  return `
                    <div className="mb-4">
                      <DatePicker
                        label="${attr.name}"
                        value={watch("${fieldName}")}
                        onChange={(date) => setValue("${fieldName}", date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: ${attr.validations?.required ? 'true' : 'false'},
                            error: !!errors.${fieldName},
                            helperText: errors.${fieldName}?.message
                          }
                        }}
                      />
                    </div>
                  `;
                }

                return `
                  <div className="mb-4">
                    <TextField
                      {...register("${fieldName}")}
                      label="${attr.name}"
                      type="${attr.dataType.toLowerCase() === 'number' ? 'number' : 'text'}"
                      fullWidth
                      required={${attr.validations?.required ? 'true' : 'false'}}
                      error={!!errors.${fieldName}}
                      helperText={errors.${fieldName}?.message}
                    />
                  </div>
                `;
              }).join('\n')}
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </LocalizationProvider>
        </div>
      );
    }
  `;
} 