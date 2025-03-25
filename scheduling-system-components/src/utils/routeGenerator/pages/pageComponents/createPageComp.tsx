/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateField } from '../../components/fields';
import { getFormValidationSchema } from '../../schemas/entityValidationSchema';
import { toast } from 'react-hot-toast';

/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 * 
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name: string): string {
  return name.replace(/[-\s]+/g, '_').split('_').map((word, index) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    return index === 0 ? capitalized.toLowerCase() : capitalized;
  }).join('');
}

/**
 * Formats a field name for React Hook Form registration
 * Replaces spaces with underscores for valid JavaScript identifiers
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted field name
 */
function formatFieldName(name: string): string {
  return name.replace(/\s+/g, '_');
}

/**
 * Checks if the entity has a custom primary key
 * 
 * @param {Entity} config - Entity configuration
 * @returns {boolean} True if a custom primary key exists
 */
function hasCustomPrimaryKey(config: Entity): boolean {
  return config.attributes.some(attr => attr.constraints.includes('primary key'));
}

/**
 * Gets the primary key field name if it exists
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Primary key field name or 'id' as default
 */
function getPrimaryKeyField(config: Entity): string {
  const primaryKeyAttr = config.attributes.find(attr => attr.constraints.includes('primary key'));
  return primaryKeyAttr ? primaryKeyAttr.name.replace(/\s+/g, '_') : 'id';
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
  const { packages } = generatePackageImports(config, { create: true });
  const formattedEntityName = formatEntityName(config.entityName);
  
  // Filter out packages we need for imports
  const needsDatePicker = config.attributes.some(attr => 
    ['date', 'datetime', 'timestamp'].includes(attr.dataType.toLowerCase())
  );
  const needsPhoneInput = config.attributes.some(attr => 
    attr.inputType.toLowerCase() === 'tel'
  );
  const needsSelect = config.attributes.some(attr => 
    attr.inputType.toLowerCase() === 'select'
  );

  const dynamicImports = `import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/validationschemas/${config.entityName.toLowerCase()}Schema';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
import { toast, Toaster } from 'react-hot-toast';
${needsDatePicker ? "import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';" : ''}
${needsPhoneInput ? "import PhoneNumberInput from '@/components/PhoneNumberInput/index';" : ''}
${needsSelect ? "import Select from 'react-select';" : ''}
`;
    
  const dateColumns = config.attributes.filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local'].some(type => attr.dataType.toLowerCase().includes(type))).map(attr => `'${attr.name}'`);
    
  const hasCustomPK = hasCustomPrimaryKey(config);
  const primaryKeyField = getPrimaryKeyField(config);

  return `'use client';
${dynamicImports}

export default function ${formattedEntityName}CreatePage() {
  const router = useRouter();
  const { loading, error, createRecord } = use${formattedEntityName}Store();
  
  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
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

    try {
      const response = await createRecord(formattedData);
      const { success, error, recordId } = response;
      toast.dismiss(); 
      if (success) {
        console.log('Create record success:', success, 'Record ID:', recordId);
        toast.success(success, { duration: 2000, position: 'top-right' });
        setTimeout(() => {
          router.push('/${config.entityName.toLowerCase()}');
        }, 2000);
      } else if (error) {
        console.error('Create record error:', error);
        toast.error(error, { duration: 5000, position: 'top-right' });
      }
    } catch (err) {
      console.error('Unexpected error during record creation:', err);
      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred', { duration: 5000, position: 'top-right' });
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000, style: { background: 'white', color: 'black' }, success: { duration: 2000, style: { background: 'white', color: 'black' } }, error: { duration: 2000, style: { background: 'white', color: 'black' } } }} />
      <div className="p-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="text-xl font-bold text-black dark:text-white">Create ${formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1)}</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="p-6.5">
                ${generateField(config)}
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={() => router.back()} className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">Cancel</button>
                  <button type="submit" disabled={loading} className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90">{loading ? 'Creating...' : 'Create'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}`;
}