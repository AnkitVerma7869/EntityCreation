"use strict";
/**
 * Create Page Component Generator
 * Generates a React component for creating new entity records
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreatePage = generateCreatePage;
var packageManager_1 = require("../../utils/packageManager");
var fields_1 = require("../../components/fields");
/**
 * Formats an entity name to follow camelCase convention
 * Example: "user_profile" -> "userProfile"
 *
 * @param {string} name - Raw entity name
 * @returns {string} Formatted camelCase name
 */
function formatEntityName(name) {
    return name.replace(/[-\s]+/g, '_').split('_').map(function (word, index) {
        var capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
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
function formatFieldName(name) {
    return name.replace(/\s+/g, '_');
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
    var packages = (0, packageManager_1.generatePackageImports)(config, { create: true }).packages;
    var formattedEntityName = formatEntityName(config.entityName);
    // Filter out packages we need for imports
    var needsDatePicker = config.attributes.some(function (attr) {
        return ['date', 'datetime', 'timestamp'].includes(attr.dataType.toLowerCase());
    });
    var needsPhoneInput = config.attributes.some(function (attr) {
        return attr.inputType.toLowerCase() === 'tel';
    });
    var needsSelect = config.attributes.some(function (attr) {
        return attr.inputType.toLowerCase() === 'select';
    });
    var dynamicImports = "import { useEffect } from 'react';\nimport { useRouter } from 'next/navigation';\nimport { useForm, Controller } from 'react-hook-form';\nimport { yupResolver } from '@hookform/resolvers/yup';\nimport { validationSchema } from '@/validationschemas/".concat(config.entityName.toLowerCase(), "Schema';\nimport { use").concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\nimport { toast, Toaster } from 'react-hot-toast';\n").concat(needsDatePicker ? "import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';" : '', "\n").concat(needsPhoneInput ? "import PhoneNumberInput from '@/components/PhoneNumberInput/index';" : '', "\n").concat(needsSelect ? "import Select from 'react-select';" : '', "\n");
    var dateColumns = config.attributes.filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local'].some(function (type) { return attr.dataType.toLowerCase().includes(type); }); }).map(function (attr) { return "'".concat(attr.name, "'"); });
    var hasCustomPK = hasCustomPrimaryKey(config);
    var primaryKeyField = getPrimaryKeyField(config);
    return "'use client';\n".concat(dynamicImports, "\n\nexport default function ").concat(formattedEntityName, "CreatePage() {\n  const router = useRouter();\n  const { loading, error, createRecord } = use").concat(formattedEntityName, "Store();\n  \n  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm({\n    resolver: yupResolver(validationSchema)\n  });\n\n  const formatLocalToISOString = (date) => {\n    const pad = (num) => String(num).padStart(2, \"0\");\n    const year = date.getFullYear();\n    const month = pad(date.getMonth() + 1);\n    const day = pad(date.getDate());\n    const hours = pad(date.getHours());\n    const minutes = pad(date.getMinutes());\n    const seconds = pad(date.getSeconds());\n    const milliseconds = pad(date.getMilliseconds());\n    const offset = -date.getTimezoneOffset();\n    const offsetHours = pad(Math.floor(Math.abs(offset) / 60));\n    const offsetMinutes = pad(Math.abs(offset) % 60);\n    const timezoneSign = offset >= 0 ? \"+\" : \"-\";\n    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;\n  };\n\n  const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n  const onSubmit = async (data: any) => {\n    const formattedData = { ...data };\n    DateFormatColumns.forEach(columnName => {\n      if (formattedData[columnName]) {\n        formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);\n      }\n    });\n\n    try {\n      const response = await createRecord(formattedData);\n      const { success, error, recordId } = response;\n      toast.dismiss(); \n      if (success) {\n        console.log('Create record success:', success, 'Record ID:', recordId);\n        toast.success(success, { duration: 2000, position: 'top-right' });\n        setTimeout(() => {\n          router.push('/").concat(config.entityName.toLowerCase(), "');\n        }, 2000);\n      } else if (error) {\n        console.error('Create record error:', error);\n        toast.error(error, { duration: 5000, position: 'top-right' });\n      }\n    } catch (err) {\n      console.error('Unexpected error during record creation:', err);\n      toast.error(err instanceof Error ? err.message : 'An unexpected error occurred', { duration: 5000, position: 'top-right' });\n    }\n  };\n\n  return (\n    <>\n      <Toaster position=\"top-right\" toastOptions={{ duration: 2000, style: { background: 'white', color: 'black' }, success: { duration: 2000, style: { background: 'white', color: 'black' } }, error: { duration: 2000, style: { background: 'white', color: 'black' } } }} />\n      <div className=\"p-2\">\n        <div className=\"flex flex-col gap-9\">\n          <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n            <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n              <h3 className=\"text-xl font-bold text-black dark:text-white\">Create ").concat(formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1), "</h3>\n            </div>\n            <form onSubmit={handleSubmit(onSubmit)} noValidate>\n              <div className=\"p-6.5\">\n                ").concat((0, fields_1.generateField)(config), "\n                <div className=\"flex gap-4 justify-end mt-6\">\n                  <button type=\"button\" onClick={() => router.back()} className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\">Cancel</button>\n                  <button type=\"submit\" disabled={loading} className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90\">{loading ? 'Creating...' : 'Create'}</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </>\n  );\n}");
}
