/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';
import { toast } from 'react-hot-toast';

/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 * 
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name: string): string {
  return name
    // Replace hyphens and spaces with underscores first
    .replace(/[-\s]+/g, '_')
    // Split by underscores
    .split('_')
    // Capitalize first letter of each word
    .map((word, index) => {
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      // For camelCase, make first word start with lowercase
      return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
    // Join without any separator
    .join('');
}

/**
 * Formats a field name for React Hook Form registration
 * Replaces spaces with underscores for valid JavaScript identifiers
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted field name
 */
function formatFieldName(name: string): string {
  // Return the original name - React Hook Form will handle it properly
  return name.replace(/\s+/g, '_');
}

/**
 * Generates a complete create page component for an entity
 * Includes form handling, validation, and API integration
 * 
 * Features:
 * - Form validation using Yup
 * - Date formatting for API submission
 * - Toast notifications for feedback
 * - Loading states
 * - Navigation after successful creation
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateCreatePage(config: Entity): string {
  const { packages } = generatePackageImports(config);
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Generate dynamic imports based on packages
  const dynamicImports = `
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useForm, Controller } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import DefaultLayout from "@/components/Layouts/DefaultLayout";
    import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';
    import PhoneNumberInput from '@/components/PhoneNumberInput/index';
    import Select from 'react-select';
    import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    import { toast, Toaster } from 'react-hot-toast';
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

    /**
     * Create Page Component for ${formattedEntityName}
     * Provides a form interface for creating new ${formattedEntityName} records
     */
    export default function ${formattedEntityName}CreatePage() {
      const router = useRouter();
      const { loading, error, createRecord } = use${formattedEntityName}Store();
      
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

      /**
       * Formats a local date to ISO string with timezone
       * Ensures consistent date format for API submission
       */
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

      /**
       * Form submission handler
       * Formats dates and submits data to API
       */
      const onSubmit = async (data: any) => {
        const formattedData = { ...data };
        
        DateFormatColumns.forEach(columnName => {
          if (formattedData[columnName]) {
            formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);
          }
        });

        const { success, error } = await createRecord(formattedData);
        toast.dismiss(); 
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
                    Create ${formattedEntityName}
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