'use client';
import { useState, useEffect } from "react";
import toast , { Toaster } from 'react-hot-toast';
import { Attribute, Entity, ConfigData } from "../../interfaces/types";
import { initialAttributeState, fetchEntityConfig, saveEntity } from "../../utils/utilstableform";
import EntitySetup from "./EntitySetup";
import EntityPreview from "./EntityPreview";
import EntityRoutes from "./EntityRoutes";

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
    validations: []
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
    // Validate required fields
    if (!entityName) {
      toast.error("Entity Name is required!");
      return;
    }

    if (attributes.length === 0) {
      toast.error("At least one attribute is required!");
      return;
    }

    const entity: Entity = {
      entityName,
      attributes
    };

    try {
      await saveEntity(entity);
      toast.success("Entity saved successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to save entity. Please try again.");
    }
  };

  return (
    <div>
      <Toaster position="top-right"/>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Left Column - Entity Setup Form */}
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
        />

        {/* Right Column - Preview and API Routes */}
        <div className="space-y-9">
          <EntityPreview
            attributes={attributes}
            setAttributes={setAttributes}
            setCurrentAttribute={setCurrentAttribute}
            handleSaveEntity={handleSaveEntity}
            resetForm={resetForm}
            setEditingIndex={setEditingIndex}
          />
          
          <EntityRoutes entityName={entityName} />
        </div>
      </div>
    </div>
  );
}