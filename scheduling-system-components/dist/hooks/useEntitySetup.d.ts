import { Attribute, ConfigData } from "../interfaces/types";
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
    showToast: (message: string, type: 'success' | 'error') => void;
}
export declare const useEntitySetup: ({ configData, entityName, setEntityName, attributes, setAttributes, currentAttribute, setCurrentAttribute, setIsCustomEntity, setSelectedEntity, editingIndex, setEditingIndex, showToast }: UseEntitySetupProps) => {
    errors: {
        entityName?: string;
        attributeName?: string;
        dataType?: string;
        size?: string;
        precision?: string;
        inputType?: string;
        options?: string;
    };
    setErrors: import("react").Dispatch<import("react").SetStateAction<{
        entityName?: string;
        attributeName?: string;
        dataType?: string;
        size?: string;
        precision?: string;
        inputType?: string;
        options?: string;
    }>>;
    handleEntitySelect: (selected: string) => void;
    handleEntityNameChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleAttributeNameChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    handleDefaultValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleConstraintsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleValidationsChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleAddAttribute: () => Promise<void>;
};
export {};
