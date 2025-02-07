import { useState } from 'react';
import { Attribute, ConfigData } from "../interfaces/types";
import { initialAttributeState } from "../utils/utilstableform";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { entityNameSchema, attributeNameSchema } from '../schemas/validationSchemas';
import { dataTypeProperties } from '../constants/dataTypeProperties';
import { precisionLimits } from '../constants/dataTypeProperties';

interface UseEntitySetupProps {
  configData: ConfigData;
  entityName: string;
  setEntityName: (name: string) => void;
  attributes: Attribute[];
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  currentAttribute: Attribute;
  setCurrentAttribute: (attribute: Attribute) => void;
  setIsCustomEntity: (isCustom: boolean) => void;
  setSelectedEntity: (entity: string) => void;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useEntitySetup = ({
  configData,
  entityName,
  setEntityName,
  attributes,
  setAttributes,
  currentAttribute,
  setCurrentAttribute,
  setIsCustomEntity,
  setSelectedEntity,
  editingIndex,
  setEditingIndex,
}: UseEntitySetupProps) => {
  const [errors, setErrors] = useState<{
    entityName?: string;
    attributeName?: string;
    dataType?: string;
    size?: string;
    precision?: string;
  }>({});

  const validateEntityName = async (name: string) => {
    try {
      if (!name) return false;
      await entityNameSchema.validate(name);
      setErrors(prev => ({ ...prev, entityName: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, entityName: err.message }));
      }
      return false;
    }
  };

  const validateAttributeName = async (name: string) => {
    try {
      if (!name) return false;
      await attributeNameSchema.validate(name);
      setErrors(prev => ({ ...prev, attributeName: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, attributeName: err.message }));
      }
      return false;
    }
  };

  const handleEntitySelect = (selected: string) => {
    setSelectedEntity(selected);
    
    if (selected === "custom") {
      setIsCustomEntity(true);
      setEntityName("");
      setAttributes([]);
    } else if (selected) {
      setIsCustomEntity(false);
      setEntityName(selected);
      setAttributes(configData.entities[selected]?.attributes || []);
    } else {
      setIsCustomEntity(false);
      setEntityName("");
      setAttributes([]);
    }
  };

  const handleEntityNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntityName(value);
    await validateEntityName(value);
  };

  const handleAttributeNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ ...currentAttribute, name: value });
    await validateAttributeName(value);
  };

  const handleDefaultValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ ...currentAttribute, defaultValue: value });
  };

  const handleConstraintsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === 'primary key') {
      const hasPrimaryKeyAlready = attributes.some((attr, idx) => {
        if (editingIndex !== null && idx === editingIndex) return false;
        return attr.constraints.includes('primary key');
      });
      
      if (hasPrimaryKeyAlready) {
        toast.error("Only one PRIMARY KEY constraint is allowed per table!");
        return;
      }
    }

    setCurrentAttribute({ 
      ...currentAttribute, 
      constraints: value ? [value] : []
    });
  };

  const handleValidationsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ 
      ...currentAttribute, 
      validations: { required: value === 'required' }
    });
  };

  const handleAddAttribute = async () => {
    try {
      // Check for duplicate attribute name
      const duplicateAttr = attributes.find((attr, index) => 
        attr.name.toLowerCase() === currentAttribute.name.toLowerCase() && 
        index !== editingIndex
      );

      if (duplicateAttr) {
        toast.error(`Attribute name "${currentAttribute.name}" already exists!`);
        return;
      }

      setErrors({});

      const trimmedAttribute = {
        ...currentAttribute,
        name: currentAttribute.name.trim(),
        defaultValue: currentAttribute.defaultValue?.trim() || ''
      };

      if (!trimmedAttribute.name) {
        setErrors(prev => ({ ...prev, attributeName: "Attribute name is required" }));
        return;
      }

      if (!trimmedAttribute.dataType) {
        setErrors(prev => ({ ...prev, dataType: "Data type is required" }));
        return;
      }

      const dataTypeProps = dataTypeProperties[trimmedAttribute.dataType.toLowerCase()];
      
      // Validate size
      if (dataTypeProps?.needsSize) {
        if (!trimmedAttribute.size) {
          setErrors(prev => ({ ...prev, size: `Size is required for ${trimmedAttribute.dataType}` }));
          return;
        }
        if (trimmedAttribute.size <= 0) {
          setErrors(prev => ({ ...prev, size: 'Size must be greater than 0' }));
          return;
        }
      }

      // Validate precision
      if (dataTypeProps?.needsPrecision) {
        if (!trimmedAttribute.precision && trimmedAttribute.precision !== 0) {
          setErrors(prev => ({ ...prev, precision: `Precision is required for ${trimmedAttribute.dataType}` }));
          return;
        }
        const limits = precisionLimits[trimmedAttribute.dataType.toLowerCase()];
        const type = trimmedAttribute.dataType.toLowerCase();
        
        // Special handling for decimal and numeric types
        if (type === 'decimal' || type === 'numeric') {
          if (trimmedAttribute.precision < 0 || trimmedAttribute.precision > limits.max) {
            setErrors(prev => ({ 
              ...prev, 
              precision: `Precision for ${trimmedAttribute.dataType} must be between 0 and ${limits.max}` 
            }));
            return;
          }
        } else if (limits && (trimmedAttribute.precision < limits.min || trimmedAttribute.precision > limits.max)) {
          setErrors(prev => ({ 
            ...prev, 
            precision: `Precision for ${trimmedAttribute.dataType} must be between ${limits.min} and ${limits.max}` 
          }));
          return;
        }
      }

      const nameValid = await validateAttributeName(trimmedAttribute.name);
      if (!nameValid) {
        return;
      }

      if (trimmedAttribute.constraints.includes('PRIMARY KEY')) {
        const hasPrimaryKeyAlready = attributes.some((attr, idx) => {
          if (editingIndex !== null && idx === editingIndex) return false;
          return attr.constraints.includes('PRIMARY KEY');
        });

        if (hasPrimaryKeyAlready) {
          return;
        }
      }

      if (editingIndex !== null) {
        setAttributes(prev => prev.map((attr, index) => 
          index === editingIndex ? trimmedAttribute : attr
        ));
        setEditingIndex(null);
        toast.success("Attribute updated successfully!");
      } else {
        setAttributes(prev => [...prev, trimmedAttribute]);
        toast.success("Attribute added successfully!");
      }

      setCurrentAttribute(initialAttributeState);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
      } else if (error instanceof Error) {
        toast.error(`Failed to add attribute: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred while adding the attribute");
      }
      console.error("Error in handleAddAttribute:", error);
    }
  };

  return {
    errors,
    setErrors,
    handleEntitySelect,
    handleEntityNameChange,
    handleAttributeNameChange,
    handleDefaultValueChange,
    handleConstraintsChange,
    handleValidationsChange,
    handleAddAttribute
  };
}; 