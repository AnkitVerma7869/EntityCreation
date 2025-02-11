"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreatePage = generateCreatePage;
var packageManager_1 = require("../../utils/packageManager");
var formGenerator_1 = require("../../utils/formGenerator");
var validationSchemaGenerator_1 = require("../../utils/validationSchemaGenerator");
function generateCreatePage(config) {
    var imports = (0, formGenerator_1.generateFormFields)(config.attributes).imports;
    var packages = (0, packageManager_1.generatePackageImports)(config).packages;
    // Generate dynamic imports based on packages
    var dynamicImports = packages
        .map(function (pkg) {
        switch (pkg.name) {
            case 'react-phone-input-2':
                return "import PhoneInput from 'react-phone-input-2';\nimport 'react-phone-input-2/lib/style.css';";
            case '@tinymce/tinymce-react':
                return "import { Editor } from '@tinymce/tinymce-react';";
            case '@mui/material-dropzone':
                return "import { DropzoneArea } from '@mui/material-dropzone';";
            default:
                return '';
        }
    })
        .filter(Boolean)
        .join('\n');
    return "\n    'use client';\n    ".concat(imports, "\n    ").concat(dynamicImports, "\n    import { useEffect } from 'react';\n    import { useRouter } from 'next/navigation';\n    import { useForm } from 'react-hook-form';\n    import { yupResolver } from '@hookform/resolvers/yup';\n    import * as yup from 'yup';\n    import { DatePicker } from '@mui/x-date-pickers/DatePicker';\n    import { LocalizationProvider } from '@mui/x-date-pickers';\n    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';\n    import { use").concat(config.entityName, "Store } from '@/store/").concat(config.entityName.toLowerCase(), "Store';\n    \n    // Generate validation schema based on attributes\n    const validationSchema = yup.object({\n      ").concat((0, validationSchemaGenerator_1.generateValidationSchema)(config.attributes), "\n    });\n\n    export default function ").concat(config.entityName, "CreatePage() {\n      const router = useRouter();\n      const { loading, error, createRecord } = use").concat(config.entityName, "Store();\n      \n      const { \n        register, \n        handleSubmit, \n        formState: { errors },\n        setValue,\n        watch\n      } = useForm({\n        resolver: yupResolver(validationSchema),\n        defaultValues: {\n          ").concat(config.attributes.map(function (attr) {
        var fieldName = attr.name.replace(/\s+/g, '_');
        if (attr.dataType.toLowerCase() === 'date') {
            return "".concat(fieldName, ": null");
        }
        else if (attr.dataType.toLowerCase() === 'number') {
            return "".concat(fieldName, ": 0");
        }
        else if (attr.dataType.toLowerCase() === 'phone') {
            return "".concat(fieldName, ": \"\"");
        }
        return "".concat(fieldName, ": \"\"");
    }).join(',\n          '), "\n        }\n      });\n\n      const onSubmit = async (data: any) => {\n        const success = await createRecord(data);\n        if (success) {\n          router.push('/").concat(config.entityName.toLowerCase(), "/list');\n        }\n      };\n\n      return (\n        <div className=\"p-6 max-w-2xl mx-auto\">\n          <h1 className=\"text-2xl font-bold mb-6\">Create ").concat(config.entityName, "</h1>\n          \n          {error && (\n            <div className=\"mb-4 p-4 bg-red-50 text-red-500 rounded\">\n              {error}\n            </div>\n          )}\n\n          <LocalizationProvider dateAdapter={AdapterDayjs}>\n            <form onSubmit={handleSubmit(onSubmit)} className=\"space-y-4\">\n              ").concat(config.attributes.map(function (attr) {
        var _a, _b, _c;
        var fieldName = attr.name.replace(/\s+/g, '_');
        if (attr.dataType.toLowerCase() === 'date') {
            return "\n                    <div className=\"mb-4\">\n                      <DatePicker\n                        label=\"".concat(attr.name, "\"\n                        value={watch(\"").concat(fieldName, "\")}\n                        onChange={(date) => setValue(\"").concat(fieldName, "\", date)}\n                        slotProps={{\n                          textField: {\n                            fullWidth: true,\n                            required: ").concat(((_a = attr.validations) === null || _a === void 0 ? void 0 : _a.required) ? 'true' : 'false', ",\n                            error: !!errors.").concat(fieldName, ",\n                            helperText: errors.").concat(fieldName, "?.message\n                          }\n                        }}\n                      />\n                    </div>\n                  ");
        }
        if (attr.dataType.toLowerCase() === 'phone') {
            return "\n                    <div className=\"mb-4\">\n                      <PhoneInput\n                        country={'us'}\n                        value={watch(\"".concat(fieldName, "\")}\n                        onChange={(phone) => setValue(\"").concat(fieldName, "\", phone)}\n                        inputProps={{\n                          required: ").concat(((_b = attr.validations) === null || _b === void 0 ? void 0 : _b.required) ? 'true' : 'false', ",\n                          className: `form-control ${errors.").concat(fieldName, " ? 'border-red-500' : ''}`\n                        }}\n                      />\n                      {errors.").concat(fieldName, " && (\n                        <p className=\"mt-1 text-sm text-red-500\">{errors.").concat(fieldName, ".message}</p>\n                      )}\n                    </div>\n                  ");
        }
        if (attr.dataType.toLowerCase() === 'rich-text') {
            return "\n                    <div className=\"mb-4\">\n                      <Editor\n                        value={watch(\"".concat(fieldName, "\")}\n                        onEditorChange={(content) => setValue(\"").concat(fieldName, "\", content)}\n                        init={{\n                          height: 300,\n                          menubar: false,\n                          plugins: ['advlist autolink lists link image charmap print preview anchor',\n                            'searchreplace visualblocks code fullscreen',\n                            'insertdatetime media table paste code help wordcount'\n                          ],\n                          toolbar: 'undo redo | formatselect | bold italic backcolor |                             alignleft aligncenter alignright alignjustify |                             bullist numlist outdent indent | removeformat | help'\n                        }}\n                      />\n                      {errors.").concat(fieldName, " && (\n                        <p className=\"mt-1 text-sm text-red-500\">{errors.").concat(fieldName, ".message}</p>\n                      )}\n                    </div>\n                  ");
        }
        if (attr.dataType.toLowerCase() === 'file') {
            return "\n                    <div className=\"mb-4\">\n                      <DropzoneArea\n                        onChange={(files) => setValue(\"".concat(fieldName, "\", files)}\n                        acceptedFiles={['image/*', 'application/pdf']}\n                        showPreviews={true}\n                        maxFileSize={5000000}\n                        filesLimit={1}\n                      />\n                      {errors.").concat(fieldName, " && (\n                        <p className=\"mt-1 text-sm text-red-500\">{errors.").concat(fieldName, ".message}</p>\n                      )}\n                    </div>\n                  ");
        }
        return "\n                  <div className=\"mb-4\">\n                    <TextField\n                      {...register(\"".concat(fieldName, "\")}\n                      label=\"").concat(attr.name, "\"\n                      type=\"").concat(attr.dataType.toLowerCase() === 'number' ? 'number' : 'text', "\"\n                      fullWidth\n                      required={").concat(((_c = attr.validations) === null || _c === void 0 ? void 0 : _c.required) ? 'true' : 'false', "}\n                      error={!!errors.").concat(fieldName, "}\n                      helperText={errors.").concat(fieldName, "?.message}\n                    />\n                  </div>\n                ");
    }).join('\n'), "\n              \n              <div className=\"flex gap-2\">\n                <button\n                  type=\"button\"\n                  onClick={() => router.back()}\n                  className=\"px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600\"\n                >\n                  Cancel\n                </button>\n                <button\n                  type=\"submit\"\n                  disabled={loading}\n                  className=\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300\"\n                >\n                  {loading ? 'Creating...' : 'Create'}\n                </button>\n              </div>\n            </form>\n          </LocalizationProvider>\n        </div>\n      );\n    }\n  ");
}
