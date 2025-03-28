import { Attribute } from '../../../../interfaces/types';

export function generateFileField(attr: Attribute, fieldName: string, defaultValue: string) {
  const isDisabled = attr.config?.disabled || false;
  const className = `w-full cursor-pointer rounded border-[1.5px] border-stroke bg-transparent text-center file:mr-4 file:px-4 file:mt-0 file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 dark:file:bg-boxdark dark:file:text-white dark:text-white dark:hover:file:bg-boxdark-2 ${attr.config?.className || ''}`;

  return `
    <div className="mb-4.5 w-full">
      <label className="mb-1 block text-sm font-medium text-black dark:text-white">
        ${attr.name} ${attr.validations?.required ? '<span className="text-meta-1">*</span>' : ''}
      </label>
      <div className="relative">
        <input
          type="file"
          {...register("${fieldName}")}
          defaultValue="${defaultValue || ''}"
          data-file-path=""
          className="${className}"
          accept="${attr.config?.acceptedFileTypes || '*'}"
          ${attr.config?.multiple ? 'multiple' : ''}
          ${isDisabled ? 'disabled' : ''}
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const formData = new FormData();
              Array.from(files).forEach((file) => {
                formData.append('files', file);
              });
              
              // Update the input display text with the file name
              const fileName = files[0].name;
              e.target.setAttribute('data-file-name', fileName);
              
              // Update the display area with the file name
              const displayArea = document.getElementById('${fieldName}-display');
              if (displayArea) {
                displayArea.textContent = \`Selected file: \${fileName}\`;
                displayArea.style.display = 'block';
              }
              
              // Upload files to server
              fetch('/api/upload', {
                method: 'POST',
                body: formData
              })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  // Update form field with file path
                  const cleanPath = data.filePath.replace('/uploads/', '');
                  setValue("${fieldName}", \`/public/uploads/\${cleanPath}\`);
                  // Store file path in data attribute
                  e.target.setAttribute('data-file-path', \`/public/uploads/\${cleanPath}\`);
                  // Update the label with the file path
                  const labelElement = document.querySelector(\`label[for="${fieldName}"]\`);
                  if (labelElement) {
                    const originalFileName = files[0].name;
                    labelElement.innerHTML = \`${attr.name} <span class="text-sm text-gray-500">(\${originalFileName})</span>\`;
                  }
                  // Update display area with the file path
                  if (displayArea) {
                    const originalFileName = files[0].name;
                    displayArea.textContent = \`Uploaded file: \${originalFileName}\`;
                  }
                } else {
                  console.error('File upload failed:', data.error);
                }
              })
              .catch(error => {
                console.error('Error uploading file:', error);
              });
            }
          }}
          onFocus={(e) => {
            // Show the file name when input is focused
            const fileName = e.target.getAttribute('data-file-name');
            if (fileName) {
              e.target.setAttribute('title', fileName);
            }
          }}
          onBlur={(e) => {
            // Clear the title when input loses focus
            e.target.removeAttribute('title');
          }}
        />
        <div id="${fieldName}-display" className="mt-2 text-sm text-gray-600" style={{ display: 'none' }}></div>
      </div>
      {errors['${fieldName}'] && (
        <p className="mt-1 text-sm text-meta-1">{errors['${fieldName}']?.message}</p>
      )}
      ${defaultValue ? `
      <div className="mt-2">
        <p className="text-sm text-gray-600">Current file: ${defaultValue}</p>
      </div>
      ` : ''}
    </div>
  `;
} 