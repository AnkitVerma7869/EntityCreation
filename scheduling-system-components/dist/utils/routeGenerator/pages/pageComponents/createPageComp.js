"use strict";
/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreatePage = generateCreatePage;
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
        // Replace hyphens and spaces with underscores first
        .replace(/[-\s]+/g, '_')
        // Split by underscores
        .split('_')
        // Capitalize first letter of each word
        .map(function (word, index) {
        var capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
function formatFieldName(name) {
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
function generateCreatePage(config) {
    var packages = (0, packageManager_1.generatePackageImports)(config).packages;
    var formattedEntityName = formatEntityName(config.entityName);
    // Generate dynamic imports based on packages
    var dynamicImports = "\n    import { useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { useForm, Controller } from 'react-hook-form';\n    import { yupResolver } from '@hookform/resolvers/yup';\n    import * as yup from 'yup';\n    import DefaultLayout from \"@/components/Layouts/DefaultLayout\";\n    import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';\n    import PhoneNumberInput from '@/components/PhoneNumberInput/index';\n    import Select from 'react-select';\n    import { use".concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\n    import { toast, Toaster } from 'react-hot-toast';\n  ");
    var dateColumns = config.attributes
        .filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
        .some(function (type) { return attr.dataType.toLowerCase().includes(type); }); })
        .map(function (attr) { return "'".concat(attr.name, "'"); });
    return "\n    'use client';\n    ".concat(dynamicImports, "\n    \n    // Generate validation schema based on attributes\n    const validationSchema = yup.object({\n      ").concat((0, validationSchemaGenerator_1.generateValidationSchema)(config.attributes), "\n    });\n\n    /**\n     * Create Page Component for ").concat(formattedEntityName, "\n     * Provides a form interface for creating new ").concat(formattedEntityName, " records\n     */\n    export default function ").concat(formattedEntityName, "CreatePage() {\n      const router = useRouter();\n      const { loading, error, createRecord } = use").concat(formattedEntityName, "Store();\n      \n      const { \n        register,\n        control, \n        handleSubmit, \n        formState: { errors },\n        setValue,\n        watch\n      } = useForm({\n        resolver: yupResolver(validationSchema)\n      });\n\n      /**\n       * Formats a local date to ISO string with timezone\n       * Ensures consistent date format for API submission\n       */\n      const formatLocalToISOString = (date) => {\n        const pad = (num) => String(num).padStart(2, \"0\");\n    \n        const year = date.getFullYear();\n        const month = pad(date.getMonth() + 1);\n        const day = pad(date.getDate());\n        const hours = pad(date.getHours());\n        const minutes = pad(date.getMinutes());\n        const seconds = pad(date.getSeconds());\n        const milliseconds = pad(date.getMilliseconds());\n    \n        const offset = -date.getTimezoneOffset();\n        const offsetHours = pad(Math.floor(Math.abs(offset) / 60));\n        const offsetMinutes = pad(Math.abs(offset) % 60);\n        const timezoneSign = offset >= 0 ? \"+\" : \"-\";\n    \n        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;\n      };\n\n      const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n      /**\n       * Form submission handler\n       * Formats dates and submits data to API\n       */\n      const onSubmit = async (data: any) => {\n        const formattedData = { ...data };\n        \n        DateFormatColumns.forEach(columnName => {\n          if (formattedData[columnName]) {\n            formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);\n          }\n        });\n\n        const { success, error } = await createRecord(formattedData);\n        toast.dismiss(); \n        if (success) {\n          toast.success(success, {\n            duration: 2000,\n            position: 'top-right',\n          });\n          setTimeout(() => {\n            router.push('/").concat(config.entityName.toLowerCase(), "');\n          }, 2000);\n        } else if (error) {\n          toast.error(error, {\n            duration: 5000,\n            position: 'top-right',\n          });\n        }\n      };\n\n      return (\n        <DefaultLayout>\n          <Toaster \n            position=\"top-right\"\n            toastOptions={{\n              duration: 2000,\n              style: {\n                background: 'white',\n                color: 'black',\n              },\n              success: {\n                duration: 2000,\n                style: {\n                  background: 'white',\n                  color: 'black'\n                }\n              },\n              error: {\n                duration: 2000,\n                style: {\n                  background: 'white',\n                  color: 'black'\n                }\n              },\n            }} \n          />\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <h3 className=\"font-medium text-black dark:text-white\">\n                    Create ").concat(formattedEntityName, "\n                  </h3>\n                </div>\n\n                <form onSubmit={handleSubmit(onSubmit)} noValidate>\n                  <div className=\"p-6.5\">\n                    ").concat((0, fields_1.generateField)(config), "\n\n                    <div className=\"flex gap-4 justify-end mt-6\">\n                      <button\n                        type=\"button\"\n                        onClick={() => router.back()}\n                        className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\"\n                      >\n                        Cancel\n                      </button>\n                      <button\n                        type=\"submit\"\n                        disabled={loading}\n                        className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90\"\n                      >\n                        {loading ? 'Creating...' : 'Create'}\n                      </button>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </DefaultLayout>\n      );\n    }\n  ");
}
