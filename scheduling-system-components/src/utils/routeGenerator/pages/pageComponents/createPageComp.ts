import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';


export function generateCreatePage(config: Entity): string {
  const { packages } = generatePackageImports(config);
  
  // Generate dynamic imports based on packages
  const dynamicImports = `
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useForm, Controller } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import DefaultLayout from "@/components/Layouts/DefaultLayout";
    import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    `;
    const dateColumns = config.attributes
    .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
      .some(type => attr.dataType.toLowerCase().includes(type)))
    .map(attr => `'${attr.name}'`);


  return `
    'use client';
    ${dynamicImports}
    
    // Generate validation schema based on attributes
    const validationSchema = yup.object({
      ${generateValidationSchema(config.attributes)}
    });

    export default function ${config.entityName}CreatePage() {
      const router = useRouter();
      const { loading, error, createRecord } = use${config.entityName}Store();
      
      const { 
        register,
        control, 
        handleSubmit, 
        formState: { errors },
        setValue,
        watch
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

    

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

      const onSubmit = async (data: any) => {
        const formattedData = { ...data };
        
        
        
        DateFormatColumns.forEach(columnName => {
          if (formattedData[columnName]) {
            formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);
          }
        });

        const success = await createRecord(formattedData);
        if (success) {
          router.push('/${config.entityName.toLowerCase()}');
        }
      };

      return (
        <DefaultLayout>
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Create ${config.entityName}
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="p-6.5">
                    ${generateField(config)}

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
                        {loading ? 'Creating...' : 'Create'}
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