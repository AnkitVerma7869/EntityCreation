'use client';
import { useState, useEffect } from "react";
import toast , { Toaster } from 'react-hot-toast';
import { Attribute, Entity, ConfigData } from "../../interfaces/types";
import { initialAttributeState, fetchEntityConfig, saveEntity } from "../../utils/utilstableform";
import EntitySetup from "./EntitySetup";
import EntityPreview from "./EntityPreview";
import EntityRoutes from "./EntityRoutes";

// Custom toast function to ensure only one toast at a time
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

// Loading component shown while fetching initial data
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

export default function TableForm() {
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

  // Load initial configuration data
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

  // Show loading state while fetching config
  if (loading) {
    return <LoadingState />;
  }

  // Reset form to initial state
  const resetForm = () => {
    setEntityName("");
    setAttributes([]);
    setCurrentAttribute(initialAttributeState);
    setIsCustomEntity(false);
    setSelectedEntity("");
  };

  // Handle entity save operation
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

    try {
      const response = await saveEntity(entity);
      showToast(response.message, 'success');
      resetForm();
    } catch (error: any) {
      showToast(error.message || "Failed to save entity. Please try again.", 'error');
    }
  };

  return (
    <div>
      <Toaster />
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Entity Setup Form - Now 5 columns */}
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

        {/* Right Column - Preview and API Routes - Now 7 columns */}
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
          />
          
          <EntityRoutes entityName={entityName} />
        </div>
      </div>
    </div>
  );
}