/**
 * TableForm Module
 * Main form component for creating and editing database table entities.
 * Provides a complete interface for entity management including setup, preview, and route generation.
 */

'use client';
import { useState, useEffect } from "react";
import toast , { Toaster } from 'react-hot-toast';
import { Attribute, Entity, ConfigData } from "../../interfaces/types";
import { initialAttributeState, fetchEntityConfig, saveEntity} from "../../utils/utilstableform";
import { generateTableRoutes } from '../../utils/routeGenerator';
import EntitySetup from "./EntitySetup";
import EntityPreview from "./EntityPreview";
import EntityRoutes from "./EntityRoutes";
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Props interface for TableForm component
 * @interface TableFormProps
 */
interface TableFormProps {
  initialData?: Entity;           // Initial entity data for editing mode
  onSubmit?: (data: Entity) => void;  // Callback when form is submitted
  mode?: 'create' | 'edit';      // Form mode
}

/**
 * Displays toast notifications with consistent styling
 * @param {string} message - Message to display in toast
 * @param {'success' | 'error'} type - Type of toast notification
 */
const showToast = (message: string, type: 'success' | 'error') => {
  // Dismiss all existing toasts first
  toast.dismiss();
  // Show new toast
  if (type === 'success') {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  } else {
    toast.error(message, {
      duration: 3000,
      position: 'top-right',
    });
  }
};

/**
 * Loading indicator component for initial data fetch
 * @returns {JSX.Element} Loading spinner with message
 */
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

/**
 * Full-page loading overlay for save operations
 * @returns {JSX.Element} Modal overlay with loading spinner
 */
const FullPageLoader = () => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-3 shadow-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-primary font-medium">Saving Entity...</p>
    </div>
  </div>
);

/**
 * TableForm Component
 * Provides a multi-step form interface for creating and editing database tables.
 * Features:
 * - Entity configuration with custom attributes
 * - Real-time preview of entity structure
 * - API route generation
 * - Validation and error handling
 * - Loading states and feedback
 * 
 * @param {TableFormProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function TableForm({ initialData, onSubmit, mode = 'create' }: TableFormProps) {
  // Configuration state
  const [loading, setLoading] = useState(true);
  const [configData, setConfigData] = useState<ConfigData>({
    entities: {},
    dataTypes: [],
    constraints: [],
    validations: [],
    inputTypes: {}
  });

  // Form state management
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute>(initialAttributeState);
  const [isCustomEntity, setIsCustomEntity] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  /**
   * Loads initial configuration data on component mount
   * Fetches entity types, data types, and validation rules
   */
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchEntityConfig();
        setConfigData(data);
      } catch (error) {
        console.error('Error loading configuration:', error);
        showToast('Error loading configuration', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  /**
   * Resets form state to initial values
   * Clears entity name, attributes, and selection states
   */
  const resetForm = () => {
    setEntityName("");
    setAttributes([]);
    setCurrentAttribute(initialAttributeState);
    setIsCustomEntity(false);
    setSelectedEntity("");
  };

  /**
   * Handles entity save operation
   * Validates required fields, saves entity, and generates routes
   * @returns {Promise<void>}
   */
  const handleSaveEntity = async () => {
    // Trim the entity name
    const trimmedEntityName = entityName.trim();
    
    // Validate required fields
    if (!trimmedEntityName) {
      showToast("Entity Name is required!", 'error');
      return;
    }

    if (attributes.length === 0) {
      showToast("At least one attribute is required!", 'error');
      return;
    }

    const entity: Entity = {
      entityName: trimmedEntityName,
      attributes
    };

    setIsSaving(true);
    try {
      const response = await saveEntity(entity);
      showToast(response.message, 'success');
      await generateTableRoutes({ entityName: entity.entityName, attributes: entity.attributes });
      resetForm();
      router.push('/entities');
    } catch (error: any) {
      showToast(error.message || "Failed to save entity. Please try again.", 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {isSaving && <FullPageLoader />}
      <Toaster />
      <div className="grid grid-cols-12 gap-4">
        {/* Entity Setup Form - Left Column */}
        <div className="col-span-4">
          <EntitySetup
            configData={configData}
            entityName={entityName}
            setEntityName={setEntityName}
            attributes={attributes}
            setAttributes={setAttributes}
            currentAttribute={currentAttribute}
            setCurrentAttribute={setCurrentAttribute}
            isCustomEntity={isCustomEntity}
            setIsCustomEntity={setIsCustomEntity}
            selectedEntity={selectedEntity}
            setSelectedEntity={setSelectedEntity}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            handleSaveEntity={handleSaveEntity}
            resetForm={resetForm}
            showToast={showToast}
          />
        </div>

        {/* Preview and API Routes - Right Column */}
        <div className="col-span-8 space-y-4">
          <EntityPreview
            attributes={attributes}
            setAttributes={setAttributes}
            setCurrentAttribute={setCurrentAttribute}
            handleSaveEntity={handleSaveEntity}
            resetForm={resetForm}
            setEditingIndex={setEditingIndex}
            entityName={entityName}
            showToast={showToast}
            isSaving={isSaving}
          />
          
          <EntityRoutes entityName={entityName} />
        </div>
      </div>
    </div>
  );
}