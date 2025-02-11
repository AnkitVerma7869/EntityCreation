import { Entity } from '../../../../interfaces/types';
import { generatePackageImports } from '../../utils/packageManager';
import { generateFormFields } from '../../utils/formGenerator';
import { generateValidationSchema } from '../../utils/validationSchemaGenerator';

export function generateCreatePage(config: Entity): string {
  const { imports } = generateFormFields(config.attributes);
  const { packages } = generatePackageImports(config);
  
  // Generate dynamic imports based on packages
  const dynamicImports = packages
    .map(pkg => {
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

  return `
    'use client';
    ${imports}
    ${dynamicImports}
    import { useEffect } from 'react';
    import { useRouter } from 'next/navigation';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import { LocalizationProvider } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { use${config.entityName}Store } from '@/store/${config.entityName.toLowerCase()}Store';
    
    // Generate validation schema based on attributes
    const validationSchema = yup.object({
      ${generateValidationSchema(config.attributes)}
    });

    export default function ${config.entityName}CreatePage() {
      const router = useRouter();
      const { loading, error, createRecord } = use${config.entityName}Store();
      
      const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setValue,
        watch
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          ${config.attributes.map(attr => {
            const fieldName = attr.name.replace(/\s+/g, '_');
            if (attr.dataType.toLowerCase() === 'date') {
              return `${fieldName}: null`;
            } else if (attr.dataType.toLowerCase() === 'number') {
              return `${fieldName}: 0`;
            } else if (attr.dataType.toLowerCase() === 'phone') {
              return `${fieldName}: ""`;
            }
            return `${fieldName}: ""`;
          }).join(',\n          ')}
        }
      });

      const onSubmit = async (data: any) => {
        const success = await createRecord(data);
        if (success) {
          router.push('/${config.entityName.toLowerCase()}/list');
        }
      };

      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Create ${config.entityName}</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-500 rounded">
              {error}
            </div>
          )}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              ${config.attributes.map(attr => {
                const fieldName = attr.name.replace(/\s+/g, '_');
                
                if (attr.dataType.toLowerCase() === 'date') {
                  return `
                    <div className="mb-4">
                      <DatePicker
                        label="${attr.name}"
                        value={watch("${fieldName}")}
                        onChange={(date) => setValue("${fieldName}", date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: ${attr.validations?.required ? 'true' : 'false'},
                            error: !!errors.${fieldName},
                            helperText: errors.${fieldName}?.message
                          }
                        }}
                      />
                    </div>
                  `;
                }

                if (attr.dataType.toLowerCase() === 'phone') {
                  return `
                    <div className="mb-4">
                      <PhoneInput
                        country={'us'}
                        value={watch("${fieldName}")}
                        onChange={(phone) => setValue("${fieldName}", phone)}
                        inputProps={{
                          required: ${attr.validations?.required ? 'true' : 'false'},
                          className: \`form-control \${errors.${fieldName} ? 'border-red-500' : ''}\`
                        }}
                      />
                      {errors.${fieldName} && (
                        <p className="mt-1 text-sm text-red-500">{errors.${fieldName}.message}</p>
                      )}
                    </div>
                  `;
                }

                if (attr.dataType.toLowerCase() === 'rich-text') {
                  return `
                    <div className="mb-4">
                      <Editor
                        value={watch("${fieldName}")}
                        onEditorChange={(content) => setValue("${fieldName}", content)}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: ['advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                      />
                      {errors.${fieldName} && (
                        <p className="mt-1 text-sm text-red-500">{errors.${fieldName}.message}</p>
                      )}
                    </div>
                  `;
                }

                if (attr.dataType.toLowerCase() === 'file') {
                  return `
                    <div className="mb-4">
                      <DropzoneArea
                        onChange={(files) => setValue("${fieldName}", files)}
                        acceptedFiles={['image/*', 'application/pdf']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        filesLimit={1}
                      />
                      {errors.${fieldName} && (
                        <p className="mt-1 text-sm text-red-500">{errors.${fieldName}.message}</p>
                      )}
                    </div>
                  `;
                }

                return `
                  <div className="mb-4">
                    <TextField
                      {...register("${fieldName}")}
                      label="${attr.name}"
                      type="${attr.dataType.toLowerCase() === 'number' ? 'number' : 'text'}"
                      fullWidth
                      required={${attr.validations?.required ? 'true' : 'false'}}
                      error={!!errors.${fieldName}}
                      helperText={errors.${fieldName}?.message}
                    />
                  </div>
                `;
              }).join('\n')}
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {loading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </LocalizationProvider>
        </div>
      );
    }
  `;
}