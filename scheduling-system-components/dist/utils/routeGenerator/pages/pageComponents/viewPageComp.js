"use strict";
/**
 * View Page Component Generator
 * Generates a React component for displaying detailed entity record information
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewPage = generateViewPage;
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
function generateViewPage(config) {
    var formattedEntityName = formatEntityName(config.entityName);
    // Extract date columns for special formatting
    var dateColumns = config.attributes
        .filter(function (attr) { return ['date', 'datetime', 'timestamp', 'time', 'datetime-local']
        .some(function (type) { return attr.dataType.toLowerCase().includes(type); }); })
        .map(function (attr) { return "'".concat(attr.name, "'"); });
    return "\n    'use client';\n    import { useEffect, useState } from 'react';\n    import { useRouter } from 'next/navigation';\n    import DefaultLayout from \"@/components/Layouts/DefaultLayout\";\n    import { use".concat(formattedEntityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\n    import { ArrowLeft } from 'lucide-react';\n\n    /**\n     * Formats a field name for display\n     * Example: \"user_name\" -> \"User Name\"\n     * \n     * @param {string} name - Raw field name\n     * @returns {string} Formatted display name\n     */\n    function formatFieldLabel(name: string): string {\n      return name\n        .split(/[_\\s]+/)\n        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())\n        .join(' ');\n    }\n\n    /**\n     * View Page Component for ").concat(formattedEntityName, "\n     * Displays detailed information for a single ").concat(formattedEntityName, " record\n     * \n     * @param {Object} props - Component props\n     * @param {Object} props.params - Route parameters\n     * @param {string} props.params.id - Record ID to view\n     */\n    export default function ").concat(formattedEntityName, "ViewPage({ params }: { params: { id: string } }) {\n      const router = useRouter();\n      const { loading, error, fetchRecord } = use").concat(formattedEntityName, "Store();\n      const [currentRecord, setCurrentRecord] = useState<any>(null);\n      \n      // List of columns that need date formatting\n      const DateFormatColumns = [").concat(dateColumns.join(', '), "];\n       \n      /**\n       * Formats date and time for display\n       * @param {string} inputDate - Raw date string\n       * @returns {string} Formatted date string\n       */\n      const formatDateTime = (inputDate) => {\n        if (!inputDate) return \"\";\n        const date = new Date(inputDate.replace(\" \", \"T\")); \n        return date.toLocaleString(\"en-US\", {\n          month: \"2-digit\",\n          day: \"2-digit\",\n          year: \"numeric\",\n          hour: \"2-digit\",\n          minute: \"2-digit\",\n          hour12: true\n        });\n      };\n\n      /**\n       * Fetches and formats record data\n       * Handles date formatting for date fields\n       */\n      useEffect(() => {\n        const fetchData = async () => {\n          const record = await fetchRecord(params.id);\n          const formattedRecord = { ...record };\n          DateFormatColumns.forEach(columnName => {\n            if (formattedRecord[columnName]) {\n              formattedRecord[columnName] = formatDateTime(formattedRecord[columnName]);\n            }\n          });\n          setCurrentRecord(formattedRecord);\n        }\n        fetchData();\n      }, [params.id]);\n\n      // Loading and error states\n      if (loading) return <div>Loading...</div>;\n      if (!currentRecord) return <div>Record not found</div>;\n\n      return (\n        <DefaultLayout>\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <div className=\"flex justify-between items-center\">\n                    <h3 className=\"text-xl font-bold text-black dark:text-white\">\n                      ").concat(formattedEntityName, " Details\n                    </h3>\n                    <button\n                      onClick={() => router.push(`/").concat(config.entityName.toLowerCase(), "/edit/${params.id}`)}\n\n                      className=\"inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90\"\n                    >\n                      Edit\n                    </button>\n                  </div>\n                </div>\n\n                <div className=\"p-6.5\">\n                  <div className=\"grid grid-cols-2 gap-6\">\n                    ").concat(config.attributes.map(function (attr) { return "\n                      <div className=\"col-span-1\">\n                        <h4 className=\"text-sm font-bold text-black dark:text-white mb-2\">\n                           ".concat(attr.name.split(/[_\s]+/).map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }).join(' '), "\n                        </h4>\n                        <p className=\"text-base text-gray-600 dark:text-gray-400\">\n                           {currentRecord['").concat(attr.name.replace(/\s+/g, '-'), "']}\n                        </p>\n                      </div>\n                    "); }).join(''), "\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </DefaultLayout>\n      );\n    }\n  ");
}
