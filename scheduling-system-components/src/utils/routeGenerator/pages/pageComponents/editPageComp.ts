import { Attribute, Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';

export function generateEditPage(config: Entity): string {
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

  return `
    'use client';
    ${dynamicImports}
    
    // Generate validation schema based on attributes
    const validationSchema = yup.object({
      ${generateValidationSchema(config.attributes)}
    });

    export default function ${config.entityName}EditPage({ params }: { params: { id: string } }) {
      const router = useRouter();
      const { loading, error, updateRecord, fetchRecord } = use${config.entityName}Store();
      
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

      useEffect(() => {
        const loadRecord = async () => {
          try {
            const record = await fetchRecord(params.id);
            if (record) {
              // Reset form with each field from the record
              Object.keys(record).forEach((key) => {
                setValue(key, record[key]);
              });
            }
          } catch (err: any) {
            console.error('Failed to load record:', err);
          }
        };

        loadRecord();
      }, [params.id, setValue, fetchRecord]);

      const onSubmit = async (data: any) => {
        const success = await updateRecord(params.id, data);
        if (success) {
          router.push('/${config.entityName.toLowerCase()}/list');
        }
      };

      return (
        <DefaultLayout>
          <div className="p-2">
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Edit ${config.entityName}
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