import { Pencil, Trash2 } from "lucide-react";
import { Attribute } from "../../interfaces/types";
import { formatArrayToString } from "../../utils/utilstableform";
import { toast } from "react-hot-toast";
import { entityNameSchema } from '../../schemas/validationSchemas';

// Props interface for EntityPreview component
interface EntityPreviewProps {
  attributes: Attribute[];         // List of entity attributes
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  setCurrentAttribute: (attribute: Attribute) => void;
  handleSaveEntity: () => void;    // Function to save entity
  resetForm: () => void;           // Function to reset form
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  entityName: string;
  showToast: (message: string, type: 'success' | 'error') => void;
  isSaving: boolean;  // Add this prop
}

export default function EntityPreview({
  attributes,
  setAttributes,
  setCurrentAttribute,
  handleSaveEntity,
  resetForm,
  setEditingIndex,
  entityName,
  showToast,
  isSaving
}: EntityPreviewProps) {
  // Handle editing of an existing attribute
  const handleEditAttribute = (index: number) => {
    // Just load the attribute into the form
    setCurrentAttribute(attributes[index]);
    // Store the index being edited
    setEditingIndex(index);
  };

  // Handle deletion of an attribute
  const handleDeleteAttribute = (index: number) => {
    const attributeToDelete = attributes[index];
    
    // Check if deleting a primary key
    if (attributeToDelete.constraints.includes('PRIMARY KEY')) {
      showToast("Warning: Deleting the primary key attribute!", 'error');
    }
    setAttributes((prev: Attribute[]) => prev.filter((_, i) => i !== index));
  };

  // Add validation before saving
  const handleSave = async () => {
    try {
      await entityNameSchema.validate(entityName);
      
      // Find duplicate attribute names
      const duplicates = attributes
        .map(attr => attr.name.toLowerCase())
        .filter((name, index, arr) => arr.indexOf(name) !== index);
      
      if (duplicates.length > 0) {
        showToast(`Duplicate attribute names found: ${duplicates.join(', ')}`, 'error');
        return;
      }

      // Check if there are any attributes
      if (attributes.length === 0) {
        showToast("Please add at least one attribute", 'error');
        return;
      }
       
      // If validation passes, proceed with save
      handleSaveEntity();

    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Preview header */}
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold text-xl text-black dark:text-white">Entity Preview</h3>
      </div>
      
      <div className="p-6.5">
        {/* Attributes table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            {/* Table header */}
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Attribute Name
                </th>
                <th className="px-3 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Data Type
                </th>
                <th className="px-3 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Constraints
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Editable
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Sortable
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Visible
                </th>
                <th className="px-2 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Read Only
                </th>
                <th className="px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            {/* Table body with attribute rows */}
            <tbody>
              {attributes?.map((attr, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {attr.name}
                  </td>
                  <td className="border-b border-[#eee] px-3 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {attr.dataType}
                    {attr.size !== null && `(${attr.size})`}
                    {attr.precision !== null && attr.precision !== undefined && `(${attr.precision})`}
                  </td>
                  <td className="border-b border-[#eee] px-3 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {formatArrayToString(attr.constraints)}
                  </td>
                  <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center">
                    <input
                      type="checkbox"
                      checked={attr.isEditable}
                      onChange={(e) => {
                        const updatedAttributes = [...attributes];
                        updatedAttributes[index] = {
                          ...attr,
                          isEditable: e.target.checked
                        };
                        setAttributes(updatedAttributes);
                      }}
                      className="form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center">
                    <input
                      type="checkbox"
                      checked={attr.sortable}
                      onChange={(e) => {
                        const updatedAttributes = [...attributes];
                        updatedAttributes[index] = {
                          ...attr,
                          sortable: e.target.checked
                        };
                        setAttributes(updatedAttributes);
                      }}
                      className="form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center">
                    <input
                      type="checkbox"
                      checked={attr.displayInList !== false}
                      onChange={(e) => {
                        const updatedAttributes = [...attributes];
                        updatedAttributes[index] = {
                          ...attr,
                          displayInList: e.target.checked
                        };
                        setAttributes(updatedAttributes);
                      }}
                      className="form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-2 py-3 dark:border-strokedark text-center">
                    <input
                      type="checkbox"
                      checked={attr.isReadOnly === true}
                      onChange={(e) => {
                        const updatedAttributes = [...attributes];
                        updatedAttributes[index] = {
                          ...attr,
                          isReadOnly: e.target.checked
                        };
                        setAttributes(updatedAttributes);
                      }}
                      className="form-checkbox h-4 w-4 text-primary rounded border-stroke dark:border-strokedark"
                    />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleEditAttribute(index)}>
                        <Pencil className="h-4 w-4 hover:text-primary" />
                      </button>
                      <button onClick={() => handleDeleteAttribute(index)}>
                        <Trash2 className="h-4 w-4 hover:text-meta-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action buttons */}
        <div className="mt-4.5 flex flex-wrap gap-3">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70"
          >
            Save Entity
          </button>
          <button 
            onClick={resetForm}
            disabled={isSaving}
            className="inline-flex items-center justify-center rounded btn btn-cancel px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 