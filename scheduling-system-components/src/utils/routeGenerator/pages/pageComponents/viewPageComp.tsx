/**
 * View Page Component Generator
 * Generates a React component for displaying detailed entity record information
 */

import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';

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
 * Generates a view page component for an entity
 * Includes detailed record display and navigation
 * 
 * Features:
 * - Detailed record view
 * - Date formatting
 * - Loading states
 * - Error handling
 * - Navigation to edit page
 * - Responsive layout
 * 
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
export function generateViewPage(config: Entity) {
  const { packages } = generatePackageImports(config, { view: true });
  const formattedEntityName = formatEntityName(config.entityName);

  // Extract date columns for special formatting
  const dateColumns = config.attributes
    .filter(attr => ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
      .some(type => attr.dataType.toLowerCase().includes(type)))
    .map(attr => `'${attr.name}'`);
    
  // Check if entity has a custom primary key
  const hasCustomPK = hasCustomPrimaryKey(config);
  const primaryKeyField = getPrimaryKeyField(config);

  return `'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use${formattedEntityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';


/**
 * Formats a field name for display
 * Example: "user_name" -> "User Name"
 * 
 * @param {string} name - Raw field name
 * @returns {string} Formatted display name
 */
function formatFieldLabel(name: string): string {
  return name.split(/[_\\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

/**
 * View Page Component for ${formattedEntityName}
 * Displays detailed information for a single ${formattedEntityName} record
 * 
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.id - Record ID to view
 */
export default function ${formattedEntityName}ViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { loading, error, fetchRecord } = use${formattedEntityName}Store();
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  
  // Define the primary key field to use for record identification
  const primaryKeyField = '${primaryKeyField}';
  
  // List of columns that need date formatting
  const DateFormatColumns = [${dateColumns.join(', ')}];
   
  /**
   * Formats date and time for display
   * @param {string} inputDate - Raw date string
   * @returns {string} Formatted date string
   */
  const formatDateTime = (inputDate) => {
    if (!inputDate) return "";
    const date = new Date(inputDate.replace(" ", "T")); 
    return date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  /**
   * Fetches and formats record data
   * Handles date formatting for date fields
   */
  useEffect(() => {
    const fetchData = async () => {
      const record = await fetchRecord(params.id);
      const formattedRecord = { ...record };
      DateFormatColumns.forEach(columnName => {
        if (formattedRecord[columnName]) {
          formattedRecord[columnName] = formatDateTime(formattedRecord[columnName]);
        }
      });
      setCurrentRecord(formattedRecord);
    }
    fetchData();
  }, [params.id]);

  // Loading and error states
  if (loading) return <div>Loading...</div>;
  if (!currentRecord) return <div>Record not found</div>;

  return (
    <>
      <div className="p-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-black dark:text-white">
                  ${formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1)} Details
                </h3>
                <button
                  onClick={() => router.push(\`/${config.entityName.toLowerCase()}/edit/\${params.id}\`)}
                  className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="p-6.5">
              <div className="grid grid-cols-2 gap-6">
                ${config.attributes.map(attr => `
                  <div className="col-span-1">
                    <h4 className="text-sm font-bold text-black dark:text-white mb-2">
                       ${attr.name.split(/[_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    </h4>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                       {currentRecord['${attr.name.replace(/\s+/g, '-')}']}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}`;
                }