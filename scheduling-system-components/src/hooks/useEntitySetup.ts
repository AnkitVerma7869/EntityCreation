import { useState } from 'react';
import { Attribute, ConfigData } from "../interfaces/types";
import { initialAttributeState } from "../utils/utilstableform";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { entityNameSchema, attributeNameSchema } from '../schemas/validationSchemas';

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
    setErrors({});

    if (!currentAttribute.name) {
      setErrors(prev => ({ ...prev, attributeName: "Attribute name is required" }));
      return;
    }

    if (!currentAttribute.dataType) {
      setErrors(prev => ({ ...prev, dataType: "Data type is required" }));
      return;
    }

    const nameValid = await validateAttributeName(currentAttribute.name);
    if (!nameValid) {
      return;
    }

    if (currentAttribute.constraints.includes('PRIMARY KEY')) {
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
        index === editingIndex ? currentAttribute : attr
      ));
      setEditingIndex(null);
      toast.success("Attribute updated successfully!");
    } else {
      setAttributes(prev => [...prev, currentAttribute]);
      toast.success("Attribute added successfully!");
    }

    setCurrentAttribute(initialAttributeState);
  };

  return {
    errors,
    setErrors,
    handleEntitySelect,
    handleEntityNameChange,
    handleAttributeNameChange,
    handleConstraintsChange,
    handleValidationsChange,
    handleAddAttribute
  };
}; 