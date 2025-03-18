"use strict";
/**
 * Edit Page Component Generator
 * Generates React components for editing existing entity records
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEditPage = generateEditPage;
exports.generateEditPageComponent = generateEditPageComponent;
var packageManager_1 = require("../../utils/packageManager");
var fields_1 = require("../../components/fields");
var validationSchemaGenerator_1 = require("../../utils/validationSchemaGenerator");
/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 *
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name) {
    return name
        .replace(/[-\s]+/g, '_')
        .split('_')
        .map(function (word, index) {
        var capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        return index === 0 ? capitalized.toLowerCase() : capitalized;
    })
        .join('');
}
/**
 * Checks if the entity has a custom primary key
 *
 * @param {Entity} config - Entity configuration
 * @returns {boolean} True if a custom primary key exists
 */
function hasCustomPrimaryKey(config) {
    return config.attributes.some(function (attr) { return attr.constraints.includes('primary key'); });
}
/**
 * Gets the primary key field name if it exists
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Primary key field name or 'id' as default
 */
function getPrimaryKeyField(config) {
    var primaryKeyAttr = config.attributes.find(function (attr) { return attr.constraints.includes('primary key'); });
    return primaryKeyAttr ? primaryKeyAttr.name.replace(/\s+/g, '_') : 'id';
}
/**
 * Generates a complete edit page component for an entity
 * Includes form handling, data fetching, validation, and API integration
 *
 * Features:
 * - Data fetching and population
 * - Form validation using Yup
 * - Date format conversion
 * - Toast notifications
 * - Loading states
 * - Navigation after successful update
 *
 * @param {Entity} config - Entity configuration
 * @returns {string} Generated React component code
 */
function generateEditPage(config) {
    var packages = (0, packageManager_1.generatePackageImports)(config).packages;
    var formattedEntityName = formatEntityName(config.entityName);
    var dynamicImports = "\n    import { useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { useForm, Controller } from 'react-hook-form';\n    import { yupResolver } from '@hookform/resolvers/yup';\n    import * as yup from 'yup';\n    import DefaultLayout from \"@/components/Layouts/DefaultLayout\";\n    import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';\n    import { use".concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\n    import PhoneNumberInput from '@/components/PhoneNumberInput/index';\n    import Select from 'react-select';\n    import { toast, Toaster } from 'react-hot-toast';\n    ");
    var dateColumns = config.attributes
        .filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
        .some(function (type) { return attr.dataType.toLowerCase().includes(type); }); })
        .map(function (attr) { return "'".concat(attr.name, "'"); });
    // Check if entity has a custom primary key
    var hasCustomPK = hasCustomPrimaryKey(config);
    var primaryKeyField = getPrimaryKeyField(config);
    return "\n    'use client';\n    ".concat(dynamicImports, "\n    \n    // Validation schema for form fields\n    const validationSchema = yup.object({\n      ").concat((0, validationSchemaGenerator_1.generateValidationSchema)(config.attributes), "\n    });\n\n    /**\n     * Edit Page Component for ").concat(formattedEntityName, "\n     * Provides a form interface for updating existing ").concat(formattedEntityName, " records\n     * \n     * @param {Object} props - Component props\n     * @param {Object} props.params - Route parameters\n     * @param {string} props.params.id - Record ID to edit\n     */\n    export default function ").concat(formattedEntityName, "EditPage({ params }: { params: { id: string } }) {\n      const router = useRouter();\n      const { loading, error, updateRecord, fetchRecord } = use").concat(formattedEntityName, "Store();\n      \n      // Define the primary key field to use for record identification\n      const primaryKeyField = '").concat(primaryKeyField, "';\n      \n      const { \n        register,\n        control, \n        handleSubmit, \n        formState: { errors },\n        setValue,\n        watch,\n        reset\n      } = useForm({\n        resolver: yupResolver(validationSchema)\n      });\n\n      /**\n       * Converts ISO date string to local date format\n       * @param {string} isoString - ISO formatted date string\n       * @returns {string} Local date string\n       */\n      const convertToLocal = (isoString) => {\n        if (!isoString) return \"\";\n        const date = new Date(isoString);\n        const pad = (num) => String(num).padStart(2, \"0\");\n        \n        const year = date.getFullYear();\n        const month = pad(date.getMonth() + 1); \n        const day = pad(date.getDate());\n        const hours = pad(date.getHours());\n        const minutes = pad(date.getMinutes());\n        \n        return `${year}-${month}-${day}T${hours}:${minutes}`;\n      };\n\n      /**\n       * Formats local date to ISO string with timezone\n       * @param {Date} date - Date object to format\n       * @returns {string} ISO formatted date string\n       */\n      const formatLocalToISOString = (date) => {\n        const pad = (num) => String(num).padStart(2, \"0\");\n    \n        const year = date.getFullYear();\n        const month = pad(date.getMonth() + 1);\n        const day = pad(date.getDate());\n        const hours = pad(date.getHours());\n        const minutes = pad(date.getMinutes());\n        const seconds = pad(date.getSeconds());\n        const milliseconds = pad(date.getMilliseconds());\n    \n        const offset = -date.getTimezoneOffset();\n        const offsetHours = pad(Math.floor(Math.abs(offset) / 60));\n        const offsetMinutes = pad(Math.abs(offset) % 60);\n        const timezoneSign = offset >= 0 ? \"+\" : \"-\";\n    \n        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;\n      };\n\n      const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n      /**\n       * Loads and populates form with existing record data\n       * Handles date format conversion for date fields\n       */\n      useEffect(() => {\n        const loadRecord = async () => {\n          try {\n            const record = await fetchRecord(params.id);\n            if (record) {\n              const { created_at, updated_at, ...formattedData } = record;\n              \n              DateFormatColumns.forEach(columnName => {\n                if (formattedData[columnName]) {\n                  formattedData[columnName] = convertToLocal(formattedData[columnName]);\n                }\n              });\n\n              reset(formattedData);\n            }\n          } catch (err) {\n            console.error('Failed to load record:', err);\n          }\n        };\n\n        loadRecord();\n      }, [params.id, reset, fetchRecord]);\n\n      /**\n       * Form submission handler\n       * Formats dates and submits updated data to API\n       * @param {Object} data - Form data\n       */\n      const onSubmit = async (data) => {  \n        const { created_at, updated_at, ...formattedData } = { ...data };\n        \n        DateFormatColumns.forEach(columnName => {\n          if (formattedData[columnName]) {\n            formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);\n          }\n        });\n\n        const { success, error } = await updateRecord(params.id, formattedData);\n        toast.dismiss(); \n        if (success) {\n          toast.success(success, {\n            duration: 2000,\n            position: 'top-right',\n          });\n          setTimeout(() => {\n            router.push('/").concat(config.entityName.toLowerCase(), "');\n          }, 2000);\n        } else if (error) {\n          toast.error(error, {\n            duration: 5000,\n            position: 'top-right',\n          });\n        }\n      };\n\n      return (\n        <DefaultLayout>\n          <Toaster \n            position=\"top-right\"\n            toastOptions={{\n              duration: 2000,\n              style: {\n                background: 'white',\n                color: 'black',\n              },\n              success: {\n                duration: 2000,\n                style: {\n                  background: 'white',\n                  color: 'black'\n                }\n              },\n              error: {\n                duration: 2000,\n                style: {\n                  background: 'white',\n                  color: 'black'\n                }\n              },\n            }} \n          />\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <h3 className=\"font-medium text-black dark:text-white\">\n                    Edit ").concat(formattedEntityName, "\n                  </h3>\n                </div>\n\n                <form onSubmit={handleSubmit(onSubmit)} noValidate>\n                  <div className=\"p-6.5\">\n                    ").concat((0, fields_1.generateField)(config, true), "\n\n                    <div className=\"flex gap-4 justify-end mt-6\">\n                      <button\n                        type=\"button\"\n                        onClick={() => router.back()}\n                        className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\"\n                      >\n                        Cancel\n                      </button>\n                      <button\n                        type=\"submit\"\n                        disabled={loading}\n                        className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90\"\n                      >\n                        {loading ? 'Updating...' : 'Update'}\n                      </button>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </DefaultLayout>\n      );\n    }\n  ");
}
/**
 * Generates a reusable edit form component
 * Can be used for both create and edit operations
 *
 * @param {string} entityName - Name of the entity
 * @param {Attribute[]} attributes - Entity attributes
 * @returns {string} Generated component code
 */
function generateEditPageComponent(entityName, attributes) {
    var componentName = "".concat(entityName, "Edit");
    return "\n    import { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';\n\n    interface ".concat(componentName, "Props {\n      register: UseFormRegister<any>;\n      handleSubmit: UseFormHandleSubmit<any>;\n      onSubmit: (data: any) => Promise<void>;\n      errors: FieldErrors<any>;\n      isEdit?: boolean;\n    }\n\n    export default function ").concat(componentName, "({\n      register,\n      handleSubmit,\n      onSubmit,\n      errors,\n      isEdit = true\n    }: ").concat(componentName, "Props) {\n      return (\n        <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n          <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n            <h3 className=\"font-medium text-black dark:text-white\">\n              {isEdit ? 'Edit' : 'Create'} ").concat(entityName, "\n            </h3>\n          </div>\n          \n          <form onSubmit={handleSubmit(onSubmit)}>\n            <div className=\"p-6.5\">\n              ").concat((0, fields_1.generateField)({ entityName: entityName, attributes: attributes }), "\n              \n              <div className=\"flex gap-4\">\n                <button\n                  type=\"submit\"\n                  className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:shadow-1\"\n                >\n                  {isEdit ? 'Update' : 'Save'} ").concat(entityName, "\n                </button>\n                \n                <button\n                  type=\"button\"\n                  onClick={() => window.history.back()}\n                  className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\"\n                >\n                  Cancel\n                </button>\n              </div>\n            </div>\n          </form>\n        </div>\n      );\n    }\n  ");
}
