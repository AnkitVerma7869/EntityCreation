export interface Attribute {
  id: string;
  name: string;
  dataType: string;
  isPrimaryKey?: boolean;
  isEditable?: boolean;
  key?: 'PRIMARY' | 'FOREIGN' | 'UNIQUE' | 'NONE';
  length?: number;
  required?: boolean;
}

export interface TableConfig {
  tableName: string;
  attributes: Attribute[];
}

export interface TableFormProps {
  onCancel: () => void;
  onSave: (data: TableConfig) => Promise<void> | void;
}

export interface TableData {
  entityName: string;
  attributes: {
    name: string;
    dataType: string;
    isPrimaryKey?: boolean;
    key?: 'PRIMARY' | 'FOREIGN' | 'UNIQUE' | 'NONE';
  }[];
}

export interface Table {
  id: number;
  [key: string]: string | number;
} 