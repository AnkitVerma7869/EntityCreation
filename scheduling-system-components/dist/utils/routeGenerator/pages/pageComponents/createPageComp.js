"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreatePage = generateCreatePage;
var packageManager_1 = require("../../utils/packageManager");
var fields_1 = require("../../components/fields");
var validationSchemaGenerator_1 = require("../../utils/validationSchemaGenerator");
function generateCreatePage(config) {
    var packages = (0, packageManager_1.generatePackageImports)(config).packages;
    // Generate dynamic imports based on packages
    var dynamicImports = "\n    import { useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { useForm, Controller } from 'react-hook-form';\n    import { yupResolver } from '@hookform/resolvers/yup';\n    import * as yup from 'yup';\n    import DefaultLayout from \"@/components/Layouts/DefaultLayout\";\n    import { use".concat(config.entityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\n    ");
    return "\n    'use client';\n    ".concat(dynamicImports, "\n    \n    // Generate validation schema based on attributes\n    const validationSchema = yup.object({\n      ").concat((0, validationSchemaGenerator_1.generateValidationSchema)(config.attributes), "\n    });\n\n    export default function ").concat(config.entityName, "CreatePage() {\n      const router = useRouter();\n      const { loading, error, createRecord } = use").concat(config.entityName, "Store();\n      \n      const { \n        register,\n        control, \n        handleSubmit, \n        formState: { errors },\n        setValue,\n        watch\n      } = useForm({\n        resolver: yupResolver(validationSchema)\n      });\n\n      const onSubmit = async (data: any) => {\n        const success = await createRecord(data);\n        if (success) {\n          router.push('/").concat(config.entityName.toLowerCase(), "/list');\n        }\n      };\n\n      return (\n        <DefaultLayout>\n          <div className=\"p-2\">\n            <div className=\"flex flex-col gap-9\">\n              <div className=\"rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark\">\n                <div className=\"border-b border-stroke px-6.5 py-4 dark:border-strokedark\">\n                  <h3 className=\"font-medium text-black dark:text-white\">\n                    Create ").concat(config.entityName, "\n                  </h3>\n                </div>\n\n                <form onSubmit={handleSubmit(onSubmit)}>\n                  <div className=\"p-6.5\">\n                    ").concat((0, fields_1.generateField)(config), "\n\n                    <div className=\"flex gap-4 justify-end mt-6\">\n                      <button\n                        type=\"button\"\n                        onClick={() => router.back()}\n                        className=\"flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white\"\n                      >\n                        Cancel\n                      </button>\n                      <button\n                        type=\"submit\"\n                        disabled={loading}\n                        className=\"flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90\"\n                      >\n                        {loading ? 'Creating...' : 'Create'}\n                      </button>\n                    </div>\n                  </div>\n                </form>\n              </div>\n            </div>\n          </div>\n        </DefaultLayout>\n      );\n    }\n  ");
}
