import { useState } from 'react';
import { Attribute, ConfigData } from "../../interfaces/types";
import toast from 'react-hot-toast';
import * as yup from "yup";
import { entityNameSchema, attributeNameSchema, dataTypeSchema, sizeSchema, precisionSchema } from '../../schemas/validationSchemas';
import { dataTypeProperties, maxSizes, precisionLimits, disabledOptionClass } from '../../constants/dataTypeProperties';
import { 
  needsSizeValidation, 
  needsPrecision, 
  getNumericTypeCategory, 
  isPrimaryKeyExists, 
  hasPrimaryKey 
} from '../../helpers/helpers';
import { useEntitySetup } from '../../hooks/useEntitySetup';

// Props interface for EntitySetup component
interface EntitySetupProps {
  configData: ConfigData;          // Configuration data for entities
  entityName: string;              // Current entity name
  setEntityName: (name: string) => void;
  attributes: Attribute[];         // List of entity attributes
  setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
  currentAttribute: Attribute;     // Currently edited attribute
  setCurrentAttribute: (attribute: Attribute) => void;
  isCustomEntity: boolean;         // Flag for custom entity creation
  setIsCustomEntity: (isCustom: boolean) => void;
  selectedEntity: string;          // Currently selected entity
  setSelectedEntity: (entity: string) => void;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function EntitySetup(props: EntitySetupProps) {
  const {
    configData,
    entityName,
    setEntityName,
    attributes,
    setAttributes,
    currentAttribute,
    setCurrentAttribute,
    isCustomEntity,
    setIsCustomEntity,
    selectedEntity,
    setSelectedEntity,
    editingIndex,
    setEditingIndex,
  } = props;

  const {
    errors,
    setErrors,
    handleEntitySelect,
    handleEntityNameChange,
    handleAttributeNameChange,
    handleConstraintsChange,
    handleValidationsChange,
    handleAddAttribute
  } = useEntitySetup({
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
  });

  // Add button text based on edit state
  const addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';

  // Update validateSize function
  const validateSize = async (size: number | null, dataType: string): Promise<boolean> => {
    try {
      await sizeSchema.validate(size, { context: { dataType } });
      setErrors(prev => ({ ...prev, size: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, size: err.message }));
      }
      return false;
    }
  };

  // Update handleSizeChange function
  const handleSizeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = value ? Number(value) : null;
    
    setCurrentAttribute({
      ...currentAttribute, 
      size: numberValue
    });

    // Clear error if input is empty
    if (!value) {
      setErrors(prev => ({ ...prev, size: undefined }));
      return;
    }

    if (currentAttribute.dataType) {
      const type = currentAttribute.dataType.toLowerCase();
      
      // Validate size limits
      if (type === 'char' || type === 'varchar') {
        const maxSize = maxSizes[type];
        if (numberValue && numberValue > 0 && numberValue <= maxSize) {
          setErrors(prev => ({ ...prev, size: undefined }));
        } else if (numberValue && numberValue > maxSize) {
          setErrors(prev => ({ 
            ...prev, 
            size: `Maximum size for ${type.toUpperCase()} is ${maxSize}` 
          }));
        }
      } else {
        await validateSize(numberValue, currentAttribute.dataType);
      }
    }
  };

  // Update validatePrecision function
  const validatePrecision = async (precision: number | null, dataType: string): Promise<boolean> => {
    try {
      await precisionSchema.validate(precision, { context: { dataType } });
      setErrors(prev => ({ ...prev, precision: undefined }));
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, precision: err.message }));
      }
      return false;
    }
  };

  // Update handlePrecisionChange function
  const handlePrecisionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = value ? Number(value) : null;
    
    setCurrentAttribute({
      ...currentAttribute, 
      precision: numberValue
    });

    // Clear error if input is empty
    if (!value) {
      setErrors(prev => ({ ...prev, precision: undefined }));
      return;
    }

    if (currentAttribute.dataType) {
      const type = currentAttribute.dataType.toLowerCase();
      const limits = precisionLimits[type];
      
      // Validate precision limits
      if (limits && numberValue !== null) {
        if (numberValue >= limits.min && numberValue <= limits.max) {
          setErrors(prev => ({ ...prev, precision: undefined }));
        } else {
          setErrors(prev => ({ 
            ...prev, 
            precision: `Precision for ${type.toUpperCase()} must be between ${limits.min} and ${limits.max}` 
          }));
        }
      } else {
        await validatePrecision(numberValue, currentAttribute.dataType);
      }
    }
  };

  // Update handleDataTypeChange to handle errors immediately
  const handleDataTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDataType = e.target.value.toLowerCase();
    
    try {
      await dataTypeSchema.validate(newDataType);
      setErrors(prev => ({ ...prev, dataType: undefined }));
      
      const typeProps = dataTypeProperties[newDataType] || { needsSize: false, needsPrecision: false };
      
      // Update current attribute
      setCurrentAttribute({
        ...currentAttribute,
        dataType: newDataType,
        size: typeProps.needsSize ? currentAttribute.size : null,
        precision: typeProps.needsPrecision ? currentAttribute.precision : null
      });

      // Validate size and precision immediately if they exist
      if (typeProps.needsSize && currentAttribute.size) {
        await validateSize(currentAttribute.size, newDataType);
      }
      
      if (typeProps.needsPrecision && currentAttribute.precision) {
        await validatePrecision(currentAttribute.precision, newDataType);
      }

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, dataType: err.message }));
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold text-xl text-black dark:text-white">Entity Setup</h3>
      </div>
      
      <div className="p-6.5 space-y-4">
        {/* Select Entity */}
        <div>
          <label className="mb-1 block text-sm font-medium text-black dark:text-white">
            Select Entity <span className="text-meta-1">*</span>
          </label>
          <select
            value={selectedEntity}
            onChange={(e) => handleEntitySelect(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select an entity</option>
            {Object.keys(configData.entities).map((entity) => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
            <option value="custom">Create Custom Entity</option>
          </select>
        </div>

        {isCustomEntity && (
          <div>
            <label className="mb-1 block text-sm font-medium text-black dark:text-white">
              Entity Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              value={entityName}
              onChange={handleEntityNameChange}
              className={`w-full rounded border-[1.5px] ${
                errors.entityName ? 'border-meta-1' : 'border-stroke'
              } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              placeholder="Enter entity name"
            />
            {errors.entityName && (
              <p className="text-meta-1 text-sm mt-1">{errors.entityName}</p>
            )}
          </div>
        )}

        {(isCustomEntity || entityName) && (
          <>
            {/* Attribute Fields */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Attribute Name <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                value={currentAttribute.name}
                onChange={handleAttributeNameChange}
                required
                className={`w-full rounded border-[1.5px] ${
                  errors.attributeName ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                placeholder="Enter attribute name"
              />
              {errors.attributeName && (
                <p className="text-meta-1 text-sm mt-1">{errors.attributeName}</p>
              )}
            </div>

            {/* Data Type */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Data Type <span className="text-meta-1">*</span>
              </label>
              <select
                value={currentAttribute.dataType}
                onChange={handleDataTypeChange}
                className={`w-full rounded border-[1.5px] ${
                  errors.dataType ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select data type</option>
                {configData.dataTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.dataType && (
                <p className="text-meta-1 text-sm mt-1">{errors.dataType}</p>
              )}
            </div>

            {/* Size and Precision Inputs in a single row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Size Input */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Size 
                  {['char', 'varchar'].includes(currentAttribute.dataType.toLowerCase()) && 
                    <span className="text-meta-1">*</span>
                  }
                </label>
                <input
                  type="number"
                  value={currentAttribute.size || ''}
                  onChange={handleSizeChange}
                  disabled={!needsSizeValidation(currentAttribute.dataType)}
                  className={`w-full rounded border-[1.5px] ${
                    errors.size ? 'border-meta-1' : 'border-stroke'
                  } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                    !needsSizeValidation(currentAttribute.dataType) ? 'opacity-50' : ''
                  }`}
                  placeholder={getNumericTypeCategory(currentAttribute.dataType) ? 'Optional size' : 'Size'}
                />
                {errors.size && (
                  <p className="text-meta-1 text-sm mt-1">{errors.size}</p>
                )}
              </div>

              {/* Precision Input */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Precision
                  {needsPrecision(currentAttribute.dataType) && 
                    <span className="text-meta-1">*</span>
                  }
                </label>
                <input
                  type="number"
                  value={currentAttribute.precision || ''}
                  onChange={handlePrecisionChange}
                  disabled={!needsPrecision(currentAttribute.dataType)}
                  className={`w-full rounded border-[1.5px] ${
                    errors.precision ? 'border-meta-1' : 'border-stroke'
                  } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                    !needsPrecision(currentAttribute.dataType) ? 'opacity-50' : ''
                  }`}
                  placeholder={needsPrecision(currentAttribute.dataType) ? 'Enter precision' : 'Not applicable'}
                />
                {errors.precision && (
                  <p className="text-meta-1 text-sm mt-1">{errors.precision}</p>
                )}
              </div>
            </div>

            {/* Constraints */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Constraints
              </label>
              <select 
                value={currentAttribute.constraints[0] || ''}
                onChange={handleConstraintsChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select constraint</option>
                {configData.constraints.map((constraint) => {
                  const isDisabled = constraint === 'primary key' && isPrimaryKeyExists(attributes, editingIndex);
                  return (
                    <option 
                      key={constraint} 
                      value={constraint}
                      disabled={isDisabled}
                      className={isDisabled ? disabledOptionClass : ''}
                      title={constraint === 'primary key' ? "There can be only one primary key in a table" : ""}
                    >
                      {constraint}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Default Value */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Default Value
              </label>
              <input
                type="text"
                value={currentAttribute.defaultValue || ''}
                onChange={(e) => setCurrentAttribute({...currentAttribute, defaultValue: e.target.value})}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter default value"
              />
            </div>

            {/* Validations */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Validations
              </label>
              <select
                value={currentAttribute.validations.required ? 'required' : ''}
                onChange={handleValidationsChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select validation</option>
                {configData.validations.map((validation) => (
                  <option key={validation} value={validation}>{validation}</option>
                ))}
              </select>
              {currentAttribute.validations.required && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1">
                    Required
                    <button 
                      onClick={() => setCurrentAttribute({
                        ...currentAttribute,
                        validations: { required: false }
                      })}
                      className="ml-1 hover:text-meta-1"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </span>
                </div>
              )}
            </div>

            <button 
              onClick={handleAddAttribute}
              className="flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
            >
              {addButtonText}
            </button>
          </>
        )}
      </div>
    </div>
  );
} 