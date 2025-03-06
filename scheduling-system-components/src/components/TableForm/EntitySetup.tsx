import { useState, useEffect } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';
import { Attribute, ConfigData } from "../../interfaces/types";
import * as yup from "yup";
import { entityNameSchema, attributeNameSchema, dataTypeSchema, sizeSchema, precisionSchema, enumValuesSchema } from '../../schemas/validationSchemas';
import { dataTypeProperties, maxSizes, precisionLimits, disabledOptionClass } from '../../constants/dataTypeProperties';
import { 
  needsSizeValidation, 
  needsPrecision, 
  getNumericTypeCategory, 
  isPrimaryKeyExists, 
  hasPrimaryKey 
} from '../../helpers/helpers';
import { useEntitySetup } from '../../hooks/useEntitySetup';
import ForeignKeyModal from '../Modals/ForeignKeyModal';

// Props interface for EntitySetup component
interface EntitySetupProps {
  configData: ConfigData & {
    inputTypes: {
      [key: string]: {
        dataType: string;
        size?: number;
        precision?: number;
        htmlType: string;
        options?: Array<{ value: string; label: string }>;
        min?: number;
        max?: number;
        step?: number;
        isDataTypeFixed?: boolean;
        enumType?: string;
      }
    }
  };      
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
  handleSaveEntity: () => void;
  resetForm: () => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export default function EntitySetup({
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
  handleSaveEntity,
  resetForm,
  showToast
}: EntitySetupProps) {
  const {
    errors,
    setErrors,
    handleEntitySelect,
    handleEntityNameChange,
    handleDefaultValueChange,
    handleConstraintsChange: originalHandleConstraintsChange,
    handleValidationsChange,
    handleAddAttribute: originalHandleAddAttribute
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
    showToast
  });

  // Add button text based on edit state
  const addButtonText = editingIndex !== null ? 'Update Attribute' : 'Add Attribute';

  // Add state for input type
  const [selectedInputType, setSelectedInputType] = useState<string>('');

  // Update state type
  const [inputOptions, setInputOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [newOption, setNewOption] = useState<string>('');

  // Add validation errors state
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // First, add a new state for select type
  const [isMultiSelect, setIsMultiSelect] = useState(false);

  // Add this with other state declarations at the top
  const [isDataTypeDisabled, setIsDataTypeDisabled] = useState(false);

  // Add this state to track if options are editable
  const [isOptionsEditable, setIsOptionsEditable] = useState(true);

  // Add reserved column names constant
  const RESERVED_COLUMNS = ['id','created_at', 'updated_at'];

  // Add state for foreign key modal
  const [isForeignKeyModalOpen, setIsForeignKeyModalOpen] = useState(false);

  const handleAttributeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    RESERVED_COLUMNS.includes(e.target.value.toLowerCase()) 
      ? setErrors(prev => ({ ...prev, attributeName: `'${e.target.value}' is a reserved column name that will be auto-generated` })) 
      : (setCurrentAttribute({ ...currentAttribute, name: e.target.value }), setErrors(prev => ({ ...prev, attributeName: undefined })));

  // Add handler for adding options
  const handleAddOption = async () => {
    if (newOption.trim()) {
      const newOptionValue = newOption.trim();
      const newOptionObj = { value: newOptionValue, label: newOptionValue };
      const updatedOptions = [...inputOptions, newOptionObj];

      try {
        await enumValuesSchema.validate(updatedOptions);
        setInputOptions(updatedOptions);
        setCurrentAttribute({
          ...currentAttribute,
          options: updatedOptions
        });
        setNewOption('');
        setErrors(prev => ({ ...prev, options: undefined })); // Clear any previous options error
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          setErrors(prev => ({ ...prev, options: err.message }));
        }
      }
    }
  };

  // Add handler for removing options
  const handleRemoveOption = (indexToRemove: number) => {
    const updatedOptions = inputOptions.filter((_, index) => index !== indexToRemove);
    setInputOptions(updatedOptions);
    setCurrentAttribute({
      ...currentAttribute,
      options: currentAttribute.options?.filter((_, index) => index !== indexToRemove) || []
    });
  };

  // Update handleInputTypeChange to set options editability
  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputType = e.target.value;
    setSelectedInputType(inputType);
    setErrors({});
    setInputOptions([]);
  
    const inputTypeConfig = configData.inputTypes[inputType];
    
    if (inputTypeConfig) {
      // Check if this is a predefined enum type
      const isPredefinedEnum = inputType.endsWith('_enum');
      setIsOptionsEditable(!isPredefinedEnum);

      // For select/radio/checkbox types
      if (['select', 'radio', 'checkbox'].includes(inputType)) {
        setCurrentAttribute({
          ...currentAttribute,
          inputType,
          dataType: 'enum',
          size: null,
          precision: null,
          options: [],
          validations: {},
          isMultiSelect: false
        });
        setIsMultiSelect(false);
      } else {
        // For all other input types including predefined enums
        setCurrentAttribute({
          ...currentAttribute,
          inputType,
          dataType: inputTypeConfig.dataType,
          size: inputTypeConfig.size || null,
          precision: inputTypeConfig.precision || null,
          options: inputTypeConfig.options || [],
          validations: {},
          isMultiSelect: undefined,
          enumType: inputType.endsWith('_enum') ? inputType : undefined
        });
  
        if (inputTypeConfig.options) {
          setInputOptions(inputTypeConfig.options);
        }
      }
  
      // Handle dataType disabling
      setIsDataTypeDisabled(inputTypeConfig.isDataTypeFixed || ['select', 'radio', 'checkbox'].includes(inputType));
    }
  };

  // Update the radio button change handler
  const handleSelectTypeChange = (isMulti: boolean) => {
    setIsMultiSelect(isMulti);
    setCurrentAttribute({
      ...currentAttribute,
      inputType: 'select', // Always keep as 'select'
      isMultiSelect: isMulti // Just update the isMultiSelect flag
    });
  };

  // Display options update
  {inputOptions.map((option, index) => (
    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-boxdark-2 p-2 rounded">
      <span>{option.label}</span>
      <button
        onClick={() => handleRemoveOption(index)}
        type="button"
        className="text-meta-1 hover:text-meta-1/80"
      >
        <X size={16} />
      </button>
    </div>
  ))}

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

    // Add validation for negative values
    if (numberValue && numberValue <= 0) {
      setErrors(prev => ({ ...prev, size: 'Size must be greater than 0' }));
      return;
    }

    if (currentAttribute.dataType) {
      const type = currentAttribute.dataType.toLowerCase();
      
      // Validate size limits
      if (type === 'char' || type === 'varchar') {
        const maxSize = maxSizes[type];
        if (numberValue && numberValue > maxSize) {
          setErrors(prev => ({ 
            ...prev, 
            size: `Maximum size for ${type.toUpperCase()} is ${maxSize}` 
          }));
        } else {
          setErrors(prev => ({ ...prev, size: undefined }));
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
      
      // Special handling for decimal and numeric types
      if (type === 'decimal' || type === 'numeric') {
        if (numberValue !== null && numberValue >= 0 && numberValue <= limits.max) {
          setErrors(prev => ({ ...prev, precision: undefined }));
        } else {
          setErrors(prev => ({ 
            ...prev, 
            precision: `Precision for ${type.toUpperCase()} must be between 0 and ${limits.max}` 
          }));
        }
      } else if (limits && numberValue !== null) {
        if (numberValue >= limits.min && numberValue <= limits.max) {
          setErrors(prev => ({ ...prev, precision: undefined }));
        } else {
          setErrors(prev => ({ 
            ...prev, 
            precision: `Precision for ${type.toUpperCase()} must be between ${limits.min} and ${limits.max}` 
          }));
        }
      }
    }
  };

  // Update handleDataTypeChange
  const handleDataTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrors({}); 
    const newDataType = e.target.value.toLowerCase();
    
    // If current input type is gender, prevent data type change
    if (selectedInputType === 'gender') {
      return;
    }
    
    try {
      await dataTypeSchema.validate(newDataType);
      setErrors(prev => ({ ...prev, dataType: undefined }));
      
      const typeProps = dataTypeProperties[newDataType] || { needsSize: false, needsPrecision: false };
      
      setCurrentAttribute({
        ...currentAttribute,
        dataType: newDataType,
        size: typeProps.needsSize ? currentAttribute.size : null,
        precision: typeProps.needsPrecision ? currentAttribute.precision : null,
        validations: {} // Clear validations when data type changes
      });

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(prev => ({ ...prev, dataType: err.message }));
      }
    }
  };

  // Update validation change handler
  const handleValidationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const validation = configData.validations
      .flatMap(g => g.validations)
      .find(v => v.name === e.target.value);
    
    if (validation) {
      setCurrentAttribute({
        ...currentAttribute,
        validations: {
          ...currentAttribute.validations,
          [validation.name]: validation.hasValue ? '' : true
        }
      });
      // Clear error when adding new validation
      setValidationErrors(prev => ({ ...prev, [validation.name]: '' }));
    }
  };

  // Update validation value change handler
  const handleValidationValueChange = (key: string, value: string | number, validation: any) => {
    setCurrentAttribute({
      ...currentAttribute,
      validations: {
        ...currentAttribute.validations,
        [key]: value
      }
    });
  };

  // Add clear validation errors function
  const clearValidationErrors = () => {
    setValidationErrors({});
  };

  // Update resetInputs to clear validation errors
  const resetInputs = () => {
    const defaultInputType = 'text';
    const defaultConfig = configData.inputTypes[defaultInputType];
    
    setSelectedInputType(defaultInputType);
    setInputOptions([]);
    setNewOption('');
    clearValidationErrors();
    setIsDataTypeDisabled(false);
    setCurrentAttribute({
      name: '',
      dataType: defaultConfig.dataType,
      size: defaultConfig.size || null,
      precision: defaultConfig.precision || null,
      constraints: [],
      defaultValue: null,
      validations: {},
      options: [],
      inputType: defaultInputType,
      isEditable: true,
      sortable: true
    });
  };

  // Remove duplicate handleConstraintsChange function
  useEffect(() => {
    if (editingIndex === null) {
      resetInputs();
    }
  }, [attributes]);

  // Add validation check before attribute add
  useEffect(() => {
    Object.entries(currentAttribute.validations).forEach(([key, value]) => {
      const validation = configData.validations
        .flatMap(g => g.validations)
        .find(v => v.name === key);

      if (validation?.hasValue && (value === '' || value === null || value === undefined)) {
        setValidationErrors(prev => ({
          ...prev,
          [key]: `Value is required for ${validation.label}`
        }));
      } else {
        setValidationErrors(prev => ({ ...prev, [key]: '' }));
      }
    });
  }, [currentAttribute.validations]);

  // Update handleAddAttribute
  const handleAddAttribute = async () => {
    // Clear previous errors
    setErrors({});
    let hasErrors = false;

    // 1. Validate attribute name
    if (!currentAttribute.name) {
      setErrors(prev => ({ ...prev, attributeName: "Attribute name is required" }));
      hasErrors = true;
    }

    // 2. Validate input type
    if (!selectedInputType) {
      setErrors(prev => ({ ...prev, inputType: "Input type is required" }));
      hasErrors = true;
    }

    // 3. Validate data type
    if (!currentAttribute.dataType) {
      setErrors(prev => ({ ...prev, dataType: "Data type is required" }));
      hasErrors = true;
    }

    // 4. Validate options for enum/select/radio/checkbox
    if ((currentAttribute.dataType.toLowerCase() === 'enum' || 
        ['radio', 'checkbox'].includes(selectedInputType)) && 
        (!inputOptions || inputOptions.length === 0)) {
      setErrors(prev => ({ ...prev, options: "At least one option is required" }));
      hasErrors = true;
    }

    if (selectedInputType === 'select') {
      setCurrentAttribute({
        ...currentAttribute,
        isMultiSelect
      });
    }

    if (hasErrors) {
      return;
    }

    await originalHandleAddAttribute();
  };

  // Add this useEffect near other useEffects in EntitySetup
  useEffect(() => {
    // When editing an attribute, set the selectedInputType
    if (editingIndex !== null && currentAttribute.inputType) {
      setSelectedInputType(currentAttribute.inputType);
      // Also set input options if they exist
      if (currentAttribute.options) {
        setInputOptions(currentAttribute.options);
      }
    }
  }, [editingIndex, currentAttribute]);

  // Add handler for foreign key selection
  const handleForeignKeySelect = (selectedTable: string, selectedColumn: string, cascadeOptions: { onDelete: string; onUpdate: string }) => {
    setCurrentAttribute({
      ...currentAttribute,
      constraints: ['foreign key'],
      references: {
        table: selectedTable,
        column: selectedColumn,
        onDelete: cascadeOptions.onDelete,
        onUpdate: cascadeOptions.onUpdate
      }
    });
    showToast(`Foreign key reference set to ${selectedTable}.${selectedColumn}`, 'success');
  };

  // Update handleConstraintsChange to handle foreign key modal
  const handleConstraintsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    if (value === 'primary key') {
      const hasPrimaryKeyAlready = attributes.some((attr, idx) => {
        if (editingIndex !== null && idx === editingIndex) return false;
        return attr.constraints.includes('primary key');
      });
      
      if (hasPrimaryKeyAlready) {
        showToast("Only one PRIMARY KEY constraint is allowed per table!", 'error');
        return;
      }
    } else if (value === 'foreign key') {
      setIsForeignKeyModalOpen(true);
      return;
    }

    setCurrentAttribute({ 
      ...currentAttribute, 
      constraints: value ? [value] : []
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-bold text-xl text-black dark:text-white">Entity Setup</h3>
      </div>
      
      <div className="p-6.5 space-y-4">
        {/* Auto-generated columns info */}
        <div className="flex flex-col bg-meta-9/30 dark:bg-boxdark-2 rounded-md p-2.5 border border-stroke dark:border-strokedark">
          <div className="text-sm font-medium text-black dark:text-white mb-2">
            Reserved columns:
          </div>
          <div className="flex items-center gap-2">
            {RESERVED_COLUMNS.map((col, index) => (
              <code key={col} className="inline-flex px-2.5 py-1 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark rounded text-primary dark:text-white font-mono text-xs whitespace-nowrap shadow-sm">
                {col}
              </code>
            ))}
          </div>
        </div>

        {/* Select Entity */}
        <div>
          <label className="mb-1 block text-sm font-medium text-black dark:text-white">
            Select Entity <span className="text-meta-1">*</span>
          </label>
          <select
            value={selectedEntity}
            onChange={(e) => handleEntitySelect(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value="">Select an entity</option>
            {Object.keys(configData.entities).map((entity) => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
            <option value="custom">Create Custom Entity</option>
          </select>
        </div>

        {(isCustomEntity || selectedEntity) && (
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

            {/* Input Type Selection */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Input Type<span className="text-meta-1">*</span>
              </label>
              <select
                value={selectedInputType || 'text'}
                onChange={handleInputTypeChange}
                className={`w-full rounded border-[1.5px] ${
                  errors.inputType ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select input type</option>
                {Object.entries(configData.inputTypes).map(([type, config]) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} ({config.htmlType})
                  </option>
                ))}
              </select>
              {errors.inputType && (
                <p className="text-meta-1 text-sm mt-1">{errors.inputType}</p>
              )}
            </div>

            {/* Data Type Selection */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Data Type<span className="text-meta-1">*</span>
              </label>
              <select
                value={currentAttribute.dataType}
                onChange={handleDataTypeChange}               
                disabled={isDataTypeDisabled}
                className={`w-full rounded border-[1.5px] ${
                  errors.dataType ? 'border-meta-1' : 'border-stroke'
                } bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
              >
                <option value="">Select data type</option>
                {configData.dataTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </option>
                ))}
              </select> 
              {errors.dataType && (
                <p className="text-meta-1 text-sm mt-1">{errors.dataType}</p>
              )}
            </div>

            {/* Options Management for radio, checkbox, select and enum data type */}
            {selectedInputType === 'select' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Select Type
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={!isMultiSelect}
                        onChange={() => handleSelectTypeChange(false)}
                        className="form-radio h-4 w-4 text-primary"
                      />
                      <span className="ml-2 text-sm">Single Select</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={isMultiSelect}
                        onChange={() => handleSelectTypeChange(true)}
                        className="form-radio h-4 w-4 text-primary"
                      />
                      <span className="ml-2 text-sm">Multi Select</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Options input for select, radio, checkbox and enum */}
            {(currentAttribute.dataType === 'enum' || ['radio', 'checkbox', 'select'].includes(selectedInputType)) && (
              <div className="space-y-1">
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Options <span className="text-meta-1">*</span>
                </label>
                {isOptionsEditable ? (
                  // Show input and add button only if options are editable
                  <div className={`flex gap-2 ${errors.options ? 'border-meta-1' : ''}`}>
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => {
                        setNewOption(e.target.value);
                        setErrors({});
                      }}
                      className={`flex-1 rounded border-[1.5px] ${
                        errors.options ? 'border-meta-1' : 'border-stroke'
                      } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                      placeholder="Enter option value"
                    />
                    <button
                      onClick={handleAddOption}
                      type="button"
                      className="inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                    >
                      Add Option
                    </button>
                  </div>
                ) : (
                  // Show a message when using predefined enum
                  <div className="text-sm text-gray-500 italic bg-gray-50 p-2 rounded">
                    Using predefined options for {selectedInputType}
                  </div>
                )}

                {/* Display options */}
                {inputOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {inputOptions.map((option, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded flex items-center gap-1"
                      >
                        {option.label}
                        {isOptionsEditable && (
                          <button 
                            onClick={() => handleRemoveOption(index)}
                            className="ml-1 hover:text-meta-1"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                )}

                {errors.options && (
                  <p className="text-meta-1 text-sm mt-1">{errors.options}</p>
                )}
              </div>
            )}

            {/* Range Input Additional Fields */}
            {selectedInputType === 'range' && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Min Value
                  </label>
                  <input
                    type="number"
                    value={currentAttribute.min || 0}
                    onChange={(e) => setCurrentAttribute({
                      ...currentAttribute,
                      min: Number(e.target.value)
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Max Value
                  </label>
                  <input
                    type="number"
                    value={currentAttribute.max || 100}
                    onChange={(e) => setCurrentAttribute({
                      ...currentAttribute,
                      max: Number(e.target.value)
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                    Step
                  </label>
                  <input
                    type="number"
                    value={currentAttribute.step || 1}
                    onChange={(e) => setCurrentAttribute({
                      ...currentAttribute,
                      step: Number(e.target.value)
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none"
                  />
                </div>
              </div>
            )}

            {/* Size and Precision Inputs in a single row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Size Input */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                  Size 
                  {needsSizeValidation(currentAttribute.dataType) && 
                    <span className="text-meta-1">*</span>
                  }
                </label>
                <input
                  type="number"
                  min="1"
                  value={currentAttribute.size || ''}
                  onChange={handleSizeChange}
                  disabled={!needsSizeValidation(currentAttribute.dataType)}
                  className={`w-full rounded border-[1.5px] ${
                    errors.size ? 'border-meta-1' : 'border-stroke'
                  } bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                    !needsSizeValidation(currentAttribute.dataType) ? 'opacity-50' : ''
                  }`}
                  placeholder={needsSizeValidation(currentAttribute.dataType) ? 'Enter size' : 'Not applicable'}
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
                  value={currentAttribute.precision ?? ''}
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      {constraint.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    </option>
                  );
                })}
              </select>

              {/* Display Foreign Key Reference Information */}
              {currentAttribute.constraints.includes('foreign key') && currentAttribute.references && (
                <div className="mt-2 p-2 bg-gray-50 dark:bg-boxdark-2 rounded border border-stroke dark:border-strokedark">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-black dark:text-white">Foreign Key Reference</h4>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsForeignKeyModalOpen(true);
                            }}
                            className="hover:text-primary"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentAttribute({
                                ...currentAttribute,
                                constraints: currentAttribute.constraints.filter(c => c !== 'foreign key'),
                                references: undefined
                              });
                              showToast('Foreign key reference removed', 'success');
                            }}
                            className="hover:text-meta-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-black dark:text-white">
                        References: <span className="font-medium">{currentAttribute.references.table}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Column: <span className="font-medium">{currentAttribute.references.column}</span>
                      </p>
                      <div className="flex gap-2 mt-1">
                        {currentAttribute.references.onDelete && (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            On Delete: {currentAttribute.references.onDelete}
                          </span>
                        )}
                        {currentAttribute.references.onUpdate && (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                            On Update: {currentAttribute.references.onUpdate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Default Value */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Default Value
              </label>
              <input
                type="text"
                value={currentAttribute.defaultValue || ''}
                onChange={handleDefaultValueChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter default value"
              />
            </div>

            {/* Validations Section */}
            <div>
              <label className="mb-1 block text-sm font-medium text-black dark:text-white">
                Validations
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value=""
                    onChange={handleValidationChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="">Add validation</option>
                    {configData.validations
                      .find(g => g.group === "General")
                      ?.validations.map((validation) => (
                        <option key={validation.name} value={validation.name}>
                          {validation.label}
                        </option>
                      ))}
                    
                    {currentAttribute.dataType && (() => {
                      const typeValidations = configData.validations
                        .find(g => {
                          switch(currentAttribute.dataType.toLowerCase()) {
                            case 'varchar':
                            case 'char':
                            case 'text':
                              return g.group === "String";
                            case 'integer':
                            case 'decimal':
                            case 'numeric':
                            case 'real':
                            case 'double precision':
                              return g.group === "Number";
                            case 'boolean':
                              return g.group === "Boolean";
                            case 'date':
                              return g.group === "Date";
                            case 'timestamp':
                            case 'time':
                            default:
                              return false;
                          }
                        })?.validations;

                      return typeValidations?.map((validation) => (
                        <option key={validation.name} value={validation.name}>
                          {validation.label}
                        </option>
                      ));
                    })()}
                  </select>
                </div>

                {/* Display Active Validations */}
                <div className="flex flex-col gap-2">
                  {Object.entries(currentAttribute.validations).map(([key, value]) => {
                    const validation = configData.validations
                      .flatMap(g => g.validations)
                      .find(v => v.name === key);

                    if (!validation) return null;

                    // Get the appropriate label based on input type
                    const validationLabel = (() => {
                      if (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name)) {
                        return validation.name === 'min' ? 'Min Date' : 'Max Date';
                      }
                      return validation.label;
                    })();

                    return (
                      <div key={key} className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full bg-gray-50 dark:bg-boxdark-2 p-2 rounded border border-stroke dark:border-strokedark">
                          <div className="flex items-center gap-2 flex-grow">
                            <span className="text-sm">{validationLabel}</span>
                            
                            {validation.hasValue && (
                              <input
                                type={(() => {
                                  if (validation.valueType === 'date' || 
                                      (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name))) {
                                    return 'date';
                                  }
                                  if (validation.valueType === 'number') {
                                    return 'number';
                                  }
                                  return 'text';
                                })()}
                                value={value || ''}
                                onChange={(e) => {
                                  let newValue;
                                  if (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name)) {
                                    // Format date value as YYYY-MM-DD
                                    const date = new Date(e.target.value);
                                    newValue = date.toISOString().split('T')[0];
                                  } else {
                                    newValue = validation.valueType === 'number' ? 
                                      Number(e.target.value) : e.target.value;
                                  }
                                  handleValidationValueChange(key, newValue, validation);
                                }}
                                className={`flex-1 rounded border-[1.5px] ${
                                  validationErrors[key] ? 'border-meta-1' : 'border-stroke'
                                } bg-transparent px-4 py-1 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                placeholder={(() => {
                                  if (validation.valueType === 'date' || 
                                      (currentAttribute.inputType === 'date' && ['min', 'max'].includes(validation.name))) {
                                    return 'Select date';
                                  }
                                  return validation.valueType === 'number' ? '0' : 'Enter value';
                                })()}
                              />
                            )}
                          </div>

                          <button 
                            onClick={() => {
                              const { [key]: _, ...restValidations } = currentAttribute.validations;
                              setCurrentAttribute({
                                ...currentAttribute,
                                validations: restValidations
                              });
                              // Clear error when removing validation
                              setValidationErrors(prev => {
                                const { [key]: _, ...rest } = prev;
                                return rest;
                              });
                            }}
                            className="text-meta-1 hover:text-meta-1/80 p-1 ml-2"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        {validationErrors[key] && (
                          <p className="text-meta-1 text-sm mt-1 ml-2">{validationErrors[key]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
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

      {/* Add ForeignKeyModal */}
      <ForeignKeyModal
        isOpen={isForeignKeyModalOpen}
        onClose={() => setIsForeignKeyModalOpen(false)}
        onSelect={handleForeignKeySelect}
        currentTable={entityName}
        initialValues={currentAttribute.references}
      />
    </div>
  );
}
