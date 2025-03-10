import React from 'react';
interface ForeignKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (selectedTable: string, selectedColumn: string, cascadeOptions: {
        onDelete: string;
        onUpdate: string;
    }, dataType: string) => void;
    currentTable: string;
    initialValues?: {
        table: string;
        column: string;
        onDelete?: string;
        onUpdate?: string;
    };
}
declare const ForeignKeyModal: React.FC<ForeignKeyModalProps>;
export default ForeignKeyModal;
