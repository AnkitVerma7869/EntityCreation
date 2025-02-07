import { Attribute, ConfigData } from "../interfaces/types";
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
export declare const useEntitySetup: ({ configData, entityName, setEntityName, attributes, setAttributes, currentAttribute, setCurrentAttribute, setIsCustomEntity, setSelectedEntity, editingIndex, setEditingIndex, }: UseEntitySetupProps) => {
    errors: {
        entityName?: string;
        attributeName?: string;
        dataType?: string;
        size?: string;
        precision?: string;
    };
    setErrors: import("react").Dispatch<import("react").SetStateAction<{
        entityName?: string;
        attributeName?: string;
        dataType?: string;
        size?: string;
        precision?: string;
    }>>;
    handleEntitySelect: (selected: string) => void;
    handleEntityNameChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleAttributeNameChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleConstraintsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleValidationsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAddAttribute: () => Promise<void>;
};
export {};
