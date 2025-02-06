import { useState } from 'react';
import { Attribute, ConfigData } from "../interfaces/types";
import { initialAttributeState } from "../utils/utilstableform";
import * as yup from "yup";
import toast from 'react-hot-toast';
import { entityNameSchema, attributeNameSchema } from '../schemas/validationSchemas';

/**
 * Props interface for useEntitySetup hook
 * Contains all the state and setter functions needed for entity configuration
 */
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

/**
 * Custom hook for managing entity setup and configuration
 * Handles validation, state management, and operations for entity and attribute creation
 */
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
  // State for tracking validation errors
  const [errors, setErrors] = useState<{
    entityName?: string;
    attributeName?: string;
    dataType?: string;
    size?: string;
    precision?: string;
  }>({});

  /**
   * Validates the entity name using Yup schema
   * @param name - The entity name to validate
   * @returns boolean indicating if validation passed
   */
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

  /**
   * Validates the attribute name using Yup schema
   * @param name - The attribute name to validate
   * @returns boolean indicating if validation passed
   */
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

  /**
   * Handles entity selection, either custom or predefined
   * Updates related states based on selection
   * @param selected - The selected entity name or "custom"
   */
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

  /**
   * Handles entity name input changes and validates the new value
   * @param e - Change event from input field
   */
  const handleEntityNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntityName(value);
    await validateEntityName(value);
  };

  /**
   * Handles attribute name input changes and validates the new value
   * @param e - Change event from input field
   */
  const handleAttributeNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ ...currentAttribute, name: value });
    await validateAttributeName(value);
  };

  /**
   * Handles changes to attribute constraints
   * Includes validation for primary key constraints
   * @param e - Change event from select field
   */
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

  /**
   * Handles changes to attribute validations
   * Currently supports required/optional validation
   * @param e - Change event from select field
   */
  const handleValidationsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentAttribute({ 
      ...currentAttribute, 
      validations: { required: value === 'required' }
    });
  };

  /**
   * Handles adding or updating attributes
   * Validates attribute data before adding/updating
   * Shows success/error messages via toast
   */
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