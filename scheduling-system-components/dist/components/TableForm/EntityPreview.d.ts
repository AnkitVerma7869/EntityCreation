import { Attribute } from "../../interfaces/types";
interface EntityPreviewProps {
    attributes: Attribute[];
    setAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>;
    setCurrentAttribute: (attribute: Attribute) => void;
    handleSaveEntity: () => void;
    resetForm: () => void;
    setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
    entityName: string;
    showToast: (message: string, type: 'success' | 'error') => void;
    isSaving: boolean;
}
export default function EntityPreview({ attributes, setAttributes, setCurrentAttribute, handleSaveEntity, resetForm, setEditingIndex, entityName, showToast, isSaving }: EntityPreviewProps): import("react/jsx-runtime").JSX.Element;
export {};
