import { Pencil, Trash2 } from "lucide-react";
import { Attribute } from "../../interfaces/types";
import { formatArrayToString } from "../../utils/utilstableform";
import { toast } from "react-hot-toast";

// Props interface for EntityPreview component
interface EntityPreviewProps {
  attributes: Attribute[];         // List of entity attributes
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  setCurrentAttribute: (attribute: Attribute) => void;
  handleSaveEntity: () => void;    // Function to save entity
  resetForm: () => void;           // Function to reset form
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function EntityPreview({
  attributes,
  setAttributes,
  setCurrentAttribute,
  handleSaveEntity,
  resetForm,
  setEditingIndex
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
      toast.error("Warning: Deleting the primary key attribute!");
    }
    setAttributes((prev: Attribute[]) => prev.filter((_, i) => i !== index));
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
                <th className="px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Data Type
                </th>
                <th className="px-4 py-2 font-medium text-black dark:text-white whitespace-nowrap">
                  Constraints
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
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {attr.dataType}
                    {attr.size && `(${attr.size})`}
                    {attr.precision && `(${attr.precision})`}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-3 dark:border-strokedark whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                    {formatArrayToString(attr.constraints)}
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
            onClick={handleSaveEntity}
            className="inline-flex items-center justify-center rounded bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
          >
            Save Entity
          </button>
          <button 
            onClick={resetForm}
            className="inline-flex items-center justify-center rounded btn btn-cancel px-6 py-2 text-center font-medium text-white hover:bg-opacity-90"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 