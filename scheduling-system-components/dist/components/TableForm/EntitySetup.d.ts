import { Attribute, ConfigData } from "../../interfaces/types";
interface EntitySetupProps {
    configData: ConfigData & {
        inputTypes: {
            [key: string]: {
                dataType: string;
                size?: number;
                precision?: number;
                htmlType: string;
                options?: Array<{
                    value: string;
                    label: string;
                }>;
                min?: number;
                max?: number;
                step?: number;
                isDataTypeFixed?: boolean;
            };
        };
    };
    entityName: string;
    setEntityName: (name: string) => void;
    attributes: Attribute[];
    setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
    currentAttribute: Attribute;
    setCurrentAttribute: (attribute: Attribute) => void;
    isCustomEntity: boolean;
    setIsCustomEntity: (isCustom: boolean) => void;
    selectedEntity: string;
    setSelectedEntity: (entity: string) => void;
    editingIndex: number | null;
    setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
    handleSaveEntity: () => void;
    resetForm: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
}
export default function EntitySetup({ configData, entityName, setEntityName, attributes, setAttributes, currentAttribute, setCurrentAttribute, isCustomEntity, setIsCustomEntity, selectedEntity, setSelectedEntity, editingIndex, setEditingIndex, handleSaveEntity, resetForm, showToast }: EntitySetupProps): import("react/jsx-runtime").JSX.Element;
export {};
