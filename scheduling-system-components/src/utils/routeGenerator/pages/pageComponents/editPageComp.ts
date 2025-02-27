import { Attribute, Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';
import { toast, Toaster } from 'react-hot-toast';


// Helper function to format entity name (keep it consistent with storeGenerator)
function formatEntityName(name: string): string {
  return name
    .replace(/[-\s]+/g, '_')
    .split('_')
    .map((word, index) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
    .join('');
}

export function generateEditPage(config: Entity): string {
  const { packages } = generatePackageImports(config);
  const formattedEntityName = formatEntityName(config.entityName);
  
  const dynamicImports = `
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useForm, Controller } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import DefaultLayout from "@/components/Layouts/DefaultLayout";
    import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';
    import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    import PhoneNumberInput from '@/components/PhoneNumberInput/index';
    import Select from 'react-select';
    import { toast, Toaster } from 'react-hot-toast';
    `;

  const dateColumns = config.attributes
    .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
      .some(type => attr.dataType.toLowerCase().includes(type)))
    .map(attr => `'${attr.name}'`);


  return `
    'use client';
    ${dynamicImports}
    
    const validationSchema = yup.object({
      ${generateValidationSchema(config.attributes)}
    });

    export default function ${formattedEntityName}EditPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { loading, error, updateRecord, fetchRecord } = use${formattedEntityName}Store();
      
      const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors },
        setValue,
        watch,
        reset
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const convertToLocal = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const pad = (num) => String(num).padStart(2, "0");
        
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); 
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        
        return \`\${year}-\${month}-\${day}T\${hours}:\${minutes}\`;
      };

      const formatLocalToISOString = (date) => {
        const pad = (num) => String(num).padStart(2, "0");
    
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const milliseconds = pad(date.getMilliseconds());
    
        const offset = -date.getTimezoneOffset();
        const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
        const offsetMinutes = pad(Math.abs(offset) % 60);
        const timezoneSign = offset >= 0 ? "+" : "-";
    
        return \`\${year}-\${month}-\${day}T\${hours}:\${minutes}:\${seconds}.\${milliseconds}\${timezoneSign}\${offsetHours}:\${offsetMinutes}\`;
      };

      const DateFormatColumns = [${dateColumns.join(', ')}];

      useEffect(() => {
        const loadRecord = async () => {
          try {
            const record = await fetchRecord(params.id);
            if (record) {
              const formattedData = { ...record };
              
              DateFormatColumns.forEach(columnName => {
                if (formattedData[columnName]) {
                  formattedData[columnName] = convertToLocal(formattedData[columnName]);
                }
              });

              reset(formattedData);
            }
          } catch (err) {
            console.error('Failed to load record:', err);
          }
        };

        loadRecord();
      }, [params.id, reset, fetchRecord]);

      const onSubmit = async (data) => {  
        const formattedData = { ...data };
        
        DateFormatColumns.forEach(columnName => {
          if (formattedData[columnName]) {
            formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);
          }
        });

        const { success, error } = await updateRecord(params.id, formattedData);
        
        if (success) {
          toast.success(success, {
            duration: 2000,
            position: 'top-right',
          });
          setTimeout(() => {
            router.push('/${config.entityName.toLowerCase()}');
          }, 2000);
        } else if (error) {
          toast.error(error, {
            duration: 5000,
            position: 'top-right',
          });
        }
      };

      return (
        <DefaultLayout>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 2000,
              style: {
                background: 'white',
                color: 'black',
              },
              success: {
                duration: 2000,
                style: {
                  background: 'white',
                  color: 'black'
                }
              },
              error: {
                duration: 2000,
                style: {
                  background: 'white',
                  color: 'black'
                }
              },
            }} 
          />
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Edit ${formattedEntityName}
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="p-6.5">
                    ${generateField(config, true)}

                    <div className="flex gap-4 justify-end mt-6">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      >
                        {loading ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </DefaultLayout>
      );
    }
  `;
}

export function generateEditPageComponent(entityName: string, attributes: Attribute[]) {
  const componentName = `${entityName}Edit`;
  
  return `
    import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

    interface ${componentName}Props {
      register: UseFormRegister<any>;
      handleSubmit: UseFormHandleSubmit<any>;
      onSubmit: (data: any) => Promise<void>;
      errors: FieldErrors<any>;
      isEdit?: boolean;
    }

    export default function ${componentName}({
      register,
      handleSubmit,
      onSubmit,
      errors,
      isEdit = true
    }: ${componentName}Props) {
      return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {isEdit ? 'Edit' : 'Create'} ${entityName}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              ${generateField({ entityName, attributes })}
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:shadow-1"
                >
                  {isEdit ? 'Update' : 'Save'} ${entityName}
                </button>
                
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  `;
} 