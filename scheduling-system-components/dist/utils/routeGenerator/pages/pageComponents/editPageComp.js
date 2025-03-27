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
    var packages = (0, packageManager_1.generatePackageImports)(config, { edit: true }).packages;
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
    var dynamicImports = "import { useEffect } from 'react';\nimport { useRouter } from 'next/navigation';\nimport { useForm, Controller } from 'react-hook-form';\nimport { yupResolver } from '@hookform/resolvers/yup';\nimport * as yup from 'yup';\nimport { validationSchema } from '@/validationschemas/".concat(config.entityName.toLowerCase(), "Schema';\nimport { use").concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\nimport { toast, Toaster } from 'react-hot-toast';\n").concat(needsDatePicker ? "import DatePickerOneRequired from '@/components/FormElements/DatePickerOneRequired';" : '', "\n").concat(needsPhoneInput ? "import PhoneNumberInput from '@/components/PhoneNumberInput/index';" : '', "\n").concat(needsSelect ? "import Select from 'react-select';" : '', "\n");
    var dateColumns = config.attributes.filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local'].some(function (type) { return attr.dataType.toLowerCase().includes(type); }); }).map(function (attr) { return "'".concat(attr.name, "'"); });
    var hasCustomPK = hasCustomPrimaryKey(config);
    var primaryKeyField = getPrimaryKeyField(config);
    return "'use client';\n".concat(dynamicImports, "\n\n\nexport default function ").concat(formattedEntityName, "EditPage({ params }: { params: { id: string } }) {\n  const router = useRouter();\n  const { loading, error, updateRecord, fetchRecord } = use").concat(formattedEntityName, "Store();\n  const primaryKeyField = '").concat(primaryKeyField, "';\n  \n  const { register, control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({\n    resolver: yupResolver(validationSchema)\n  });\n\n  const convertToLocal = (isoString) => {\n    if (!isoString) return \"\";\n    const date = new Date(isoString);\n    const pad = (num) => String(num).padStart(2, \"0\");\n    const year = date.getFullYear();\n    const month = pad(date.getMonth() + 1); \n    const day = pad(date.getDate());\n    const hours = pad(date.getHours());\n    const minutes = pad(date.getMinutes());\n    return `${year}-${month}-${day}T${hours}:${minutes}`;\n  };\n\n  const formatLocalToISOString = (date) => {\n    const pad = (num) => String(num).padStart(2, \"0\");\n    const year = date.getFullYear();\n    const month = pad(date.getMonth() + 1);\n    const day = pad(date.getDate());\n    const hours = pad(date.getHours());\n    const minutes = pad(date.getMinutes());\n    const seconds = pad(date.getSeconds());\n    const milliseconds = pad(date.getMilliseconds());\n    const offset = -date.getTimezoneOffset();\n    const offsetHours = pad(Math.floor(Math.abs(offset) / 60));\n    const offsetMinutes = pad(Math.abs(offset) % 60);\n    const timezoneSign = offset >= 0 ? \"+\" : \"-\";\n    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${offsetHours}:${offsetMinutes}`;\n  };\n\n  const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n\n  useEffect(() => {\n    const loadRecord = async () => {\n      try {\n        const record = await fetchRecord(params.id);\n        if (record) {\n          const { created_at, updated_at, ...formattedData } = record;\n          DateFormatColumns.forEach(columnName => {\n            if (formattedData[columnName]) {\n              formattedData[columnName] = convertToLocal(formattedData[columnName]);\n            }\n          });\n          reset(formattedData);\n        }\n      } catch (err) {\n        console.error('Failed to load record:', err);\n      }\n    };\n    loadRecord();\n  }, [params.id, reset, fetchRecord]);\n\n  const onSubmit = async (data) => {  \n    const { created_at, updated_at, ...formattedData } = { ...data };\n    DateFormatColumns.forEach(columnName => {\n      if (formattedData[columnName]) {\n        formattedData[columnName] = formatLocalToISOString(formattedData[columnName]);\n      }\n    });\n\n    const { success, error } = await updateRecord(params.id, formattedData);\n    toast.dismiss(); \n    if (success) {\n      toast.success(success, { duration: 2000, position: 'top-right' });\n      setTimeout(() => {\n        router.push('/").concat(config.entityName.toLowerCase(), "');\n      }, 2000);\n    } else if (error) {\n      toast.error(error, { duration: 5000, position: 'top-right' });\n    }\n  };\n\n  return (\n    <>\n      <Toaster position=\"top-right\" toastOptions={{ duration: 2000, style: { background: 'white', color: 'black' }, success: { duration: 2000, style: { background: 'white', color: 'black' } }, error: { duration: 2000, style: { background: 'white', color: 'black' } } }} />\n      <div className=\"p-2\">\n        <div className=\"flex flex-col gap-9\">\n          <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n            <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n              <h3 className=\"text-xl font-bold text-black dark:text-white\">Edit ").concat(formattedEntityName.charAt(0).toUpperCase() + formattedEntityName.slice(1), "</h3>\n            </div>\n            <form onSubmit={handleSubmit(onSubmit)} noValidate>\n              <div className=\"p-6.5\">\n                ").concat((0, fields_1.generateField)(config, true), "\n                <div className=\"flex gap-4 justify-end mt-6\">\n                  <button type=\"button\" onClick={() => router.back()} className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\">Cancel</button>\n                  <button type=\"submit\" disabled={loading} className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90\">{loading ? 'Updating...' : 'Update'}</button>\n                </div>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </>\n  );\n}");
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
