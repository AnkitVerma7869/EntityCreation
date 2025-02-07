import { Attribute, ConfigData } from "../../interfaces/types";
interface EntitySetupProps {
    configData: ConfigData;
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
}
export default function EntitySetup(props: EntitySetupProps): import("react/jsx-runtime").JSX.Element;
export {};
